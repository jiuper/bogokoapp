import { useMutation } from "@tanstack/react-query";

import type { GetCreateOrderMasterApiResponse } from "@/entities/order/api/createOrderMaster/types.ts";
import type { RequestRecordDto } from "@/entities/order/types.ts";
import { createAxiosApi } from "@/shared/api";

export const createOrderMasterApi = async (params: RequestRecordDto) => {
    const data = await createAxiosApi()<GetCreateOrderMasterApiResponse>({
        type: "post",
        url: "booking/new-record",
        body: params,
    });

    return data.data;
};

export const useOrderCreateMutation = () => {
    return useMutation({
        mutationFn: createOrderMasterApi,
    });
};
