import type { GetAuthApiResponse } from "@/entities/user/getAuth/types.ts";
import { createAxiosApi } from "@/shared/api";

export type RequestAuthDto = {
    initDataRaw: string;
    user: UserInitData;
};

export type UserInitData = {
    allowsWriteToPm?: boolean;
    firstName?: string;
    lastName?: string;
    id?: number;
    languageCode?: string;
    username?: string;
};

export const getAuthApi = async (params: RequestAuthDto) => {
    return createAxiosApi()<GetAuthApiResponse>({ type: "post", url: "/auth/login", body: params })
        .then((data) => data.data)
        .catch((e) => e);
};
