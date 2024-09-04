import { useMemo } from "react";

import { useQueryMultiMasters } from "@/entities/masters/api/getMultiMasterApi";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { MasterBookingPage } from "@/view";

export function MasterFilter() {
    const queryParams = useAppSelector((state) => state.booking.bookingMasters);
    const servicesId = queryParams.reduce<string[]>(
        (acc, el) => [...acc, ...(el.masterInfo?.services?.map((elem) => elem.id.toString()) || [])],
        [],
    );

    const { data: listMultiMaster, isPending: isLoadingMultiMasters } = useQueryMultiMasters({ serviceId: servicesId });

    const listMultiMasterData = useMemo(
        () =>
            listMultiMaster?.reduce<GetMasterDto[]>((acc, cur) => {
                cur?.masters?.map((el) =>
                    acc.push({ id: el.masterId, name: el.masterName || "", image: el.masterImage, post: el.cost }),
                );

                return acc.filter((el, i) => acc.findIndex((elem) => elem?.id === el.id) === i);
            }, []) || [],
        [listMultiMaster],
    );

    return (
        <MasterBookingPage
            data={listMultiMasterData}
            isPending={isLoadingMultiMasters}
            isServices
            servicesId={servicesId}
        />
    );
}
