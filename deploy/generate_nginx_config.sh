#!/bin/bash

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

if [ "${NGINX_SECURE}" = "true" ]; then
    if [ -z "${NGINX_SSL_CERTIFICATE}" ] || [ -z "${NGINX_SSL_CERTIFICATE_KEY}" ]; then
        NGINX_SSL_CERTIFICATE=/etc/nginx/ssl/${NGINX_SERVER_NAME}.crt
        NGINX_SSL_CERTIFICATE_KEY=/etc/nginx/ssl/${NGINX_SERVER_NAME}.key
        
        if [ -f $NGINX_SSL_CERTIFICATE ] && [ -f $NGINX_SSL_CERTIFICATE_KEY ]; then
            if openssl x509 -checkend 86400 -noout -in $NGINX_SSL_CERTIFICATE; then
                log "SSL certificate and key already exist and are valid."
            else
                log "SSL certificate is expired or about to expire. Generating a new one."
                rm -f $NGINX_SSL_CERTIFICATE $NGINX_SSL_CERTIFICATE_KEY
                mkdir -p /etc/nginx/ssl
                openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
                    -keyout $NGINX_SSL_CERTIFICATE_KEY -out $NGINX_SSL_CERTIFICATE \
                    -subj "/CN=${NGINX_SERVER_NAME}"
                log "New SSL certificate and key generated."
            fi
        else
            log "SSL certificate or key does not exist. Generating a new one."
            mkdir -p /etc/nginx/ssl
            openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
                -keyout $NGINX_SSL_CERTIFICATE_KEY -out $NGINX_SSL_CERTIFICATE \
                -subj "/CN=${NGINX_SERVER_NAME}"
            log "New SSL certificate and key generated."
        fi
    else
        log "Using provided SSL certificate and key."
    fi

    NGINX_REDIRECT_TO_HTTPS="if (\$scheme != \"https\") { return 302 https://\$host\$request_uri; }"
    NGINX_HTTPS_CONFIG="server {
        listen 443 ssl;
        server_name ${NGINX_SERVER_NAME};

        ssl_certificate ${NGINX_SSL_CERTIFICATE};
        ssl_certificate_key ${NGINX_SSL_CERTIFICATE_KEY};

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files \$uri \$uri/ /index.html;
        }

        location /api {
            proxy_pass ${NGINX_INTERNAL_API_URL};
        }
    }"
else
    NGINX_REDIRECT_TO_HTTPS=""
    NGINX_HTTPS_CONFIG=""
fi

log "Generating Nginx configuration file."

awk -v server_name="${NGINX_SERVER_NAME}" \
    -v internal_api_url="${NGINX_INTERNAL_API_URL}" \
    -v redirect_to_https="${NGINX_REDIRECT_TO_HTTPS}" \
    -v https_config="${NGINX_HTTPS_CONFIG}" \
    '{
        gsub(/__NGINX_SERVER_NAME__/, server_name);
        gsub(/__NGINX_INTERNAL_API_URL__/, internal_api_url);
        gsub(/__NGINX_REDIRECT_TO_HTTPS__/, redirect_to_https);
        gsub(/__NGINX_HTTPS_CONFIG__/, https_config);
        print
    }' /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/${NGINX_SERVER_NAME}.conf

log "Generated Nginx configuration:"
cat /etc/nginx/conf.d/${NGINX_SERVER_NAME}.conf

log "Starting Nginx."
exec nginx -g 'daemon off;'