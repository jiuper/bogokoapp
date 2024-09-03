import { useQuery } from "@tanstack/react-query";

import type { GetMasterApiResponse } from "@/entities/masters/api/getMasterApi/types.ts";
import { createAxiosApi } from "@/shared/api";

type getMasterApiParams = {
    masterId?: string;
};
export const getMasterApi = async (params: getMasterApiParams) => {
    return createAxiosApi()<GetMasterApiResponse>({
        type: "get",
        url: `booking/masters/master/full-info`,
        config: { params },
    }).then((data) => data.data);
};

export const useMasterQuery = (params: getMasterApiParams) => {
    return useQuery<GetMasterApiResponse>({
        queryKey: ["info-master", params.masterId],
        queryFn: () => getMasterApi(params),
        enabled: !!params.masterId,
    });
};
