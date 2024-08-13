import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

export type CustomAxiosConfig = InternalAxiosRequestConfig & {
    _retry: boolean;
    _accessToken: string | null;
    _refreshToken: string | null;
};

export type CustomAxiosResponse<T = unknown> = Omit<AxiosResponse<T>, "config"> & {
    config: CustomAxiosConfig;
};

type CustomAxiosArgs =
    | { type: "get"; url: string; config?: AxiosRequestConfig }
    | { type: "delete"; url: string; config?: AxiosRequestConfig }
    | { type: "post"; url: string; body: object; config?: AxiosRequestConfig }
    | { type: "put"; url: string; body: object; config?: AxiosRequestConfig }
    | { type: "postForm"; url: string; body: object; config?: AxiosRequestConfig };

export const axiosInstance = axios.create({
    baseURL: "https://dikidi-booking-api.onrender.com/api",
});

export const createAxiosApi = () => {
    return <T>(args: CustomAxiosArgs) => {
        const config: CustomAxiosConfig = { ...(args.config || {}) } as CustomAxiosConfig;

        config._retry = false;

        const handleResponse = <T>(resp: AxiosResponse<T>): AxiosResponse<T> => {
            const { config } = resp as CustomAxiosResponse<T>;

            if (!config) return resp;

            return resp;
        };

        switch (args.type) {
            case "get":
                return axiosInstance.get<T>(args.url, config).then(handleResponse);
            case "delete":
                return axiosInstance.delete<T>(args.url, config).then(handleResponse);
            case "post":
                return axiosInstance.post<T>(args.url, args.body, config).then(handleResponse);
            case "put":
                return axiosInstance.put<T>(args.url, args.body, config).then(handleResponse);
            case "postForm":
                return axiosInstance.postForm<T>(args.url, args.body, config).then(handleResponse);
            default:
                return axiosInstance.get<T>("WrongUrl_FixMe!", config).then(handleResponse);
        }
    };
};
