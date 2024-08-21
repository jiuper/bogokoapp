#!/bin/bash

if [ "${NGINX_SECURE}" = "true" ]; then
    if [ -z "${NGINX_SSL_CERTIFICATE}" ] || [ -z "${NGINX_SSL_CERTIFICATE_KEY}" ]; then
        mkdir -p /etc/nginx/ssl
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/nginx/ssl/${NGINX_SERVER_NAME}.key -out /etc/nginx/ssl/${NGINX_SERVER_NAME}.crt \
            -subj "/CN=${NGINX_SERVER_NAME}"
        NGINX_SSL_CERTIFICATE=/etc/nginx/ssl/${NGINX_SERVER_NAME}.crt
        NGINX_SSL_CERTIFICATE_KEY=/etc/nginx/ssl/${NGINX_SERVER_NAME}.key
    fi

    NGINX_REDIRECT_TO_HTTPS="if (\$scheme != \"https\") { return 302 https://\$host\$request_uri; }"
    NGINX_HTTPS_CONFIG="server {
        listen 443 ssl;
        server_name ${NGINX_SERVER_NAME};

        NGINX_SSL_CERTIFICATE ${NGINX_SSL_CERTIFICATE};
        NGINX_SSL_CERTIFICATE_key ${NGINX_SSL_CERTIFICATE_KEY};

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

envsubst '${NGINX_SERVER_NAME} ${NGINX_INTERNAL_API_URL} ${NGINX_REDIRECT_TO_HTTPS} ${NGINX_HTTPS_CONFIG}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/${NGINX_SERVER_NAME}.conf

exec nginx -g 'daemon off;'