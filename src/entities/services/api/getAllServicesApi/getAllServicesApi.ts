import { useQuery } from "@tanstack/react-query";

import type { GetAllServicesApiResponse } from "@/entities/services/api/getAllServicesApi/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getAllServicesApi = async () => {
    return createAxiosApi()<GetAllServicesApiResponse>({
        type: "get",
        url: "booking/services?companyId=591511",
    }).then((data) => data.data);
};

export const useAllServicesQuery = () => {
    return useQuery<GetAllServicesApiResponse>({
        queryKey: ["list-services"],
        queryFn: () => getAllServicesApi(),
    });
};
