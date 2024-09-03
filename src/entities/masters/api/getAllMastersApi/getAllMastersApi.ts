import { useQuery } from "@tanstack/react-query";

import type { GetAllMastersApiResponse } from "@/entities/masters/api/getAllMastersApi/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getAllMastersApi = async () => {
    return createAxiosApi()<GetAllMastersApiResponse>({ type: "get", url: "/booking/masters?companyId=591511" }).then(
        (data) => data.data,
    );
};

export const useAllMastersQuery = (isFetched = false) => {
    return useQuery<GetAllMastersApiResponse>({
        queryKey: ["list-masters", isFetched],
        queryFn: () => getAllMastersApi(),
        enabled: isFetched,
    });
};
