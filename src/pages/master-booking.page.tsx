import { useMemo } from "react";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { useQueryMultiMasters } from "@/entities/masters/api/getMultiMasterApi";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { MasterBookingPage } from "@/view";

export function MasterBooking() {
    const queryParams = useAppSelector((state) => state.booking.bookingMasters);
    const servicesId = queryParams.reduce<string[]>(
        (acc, el) => [...acc, ...(el.masterInfo?.services?.map((elem) => elem.id.toString()) || [])],
        [],
    );
    const { data: listMaster, isPending: isLoadingMasters } = useAllMastersQuery(servicesId.length === 0);
    const { data: listMultiMaster, isPending: isLoadingMultiMasters } = useQueryMultiMasters(servicesId);
    const listMasterData = useMemo(() => listMaster || [], [listMaster]);
    const listMultiMasterData = useMemo(
        () =>
            listMultiMaster?.masters?.reduce<GetMasterDto[]>((acc, cur) => {
                acc.push({ id: cur.masterId, name: cur.masterName || "", image: cur.masterImage, post: cur.cost });

                return acc;
            }, []) || [],
        [listMultiMaster],
    );
    const data = useMemo(
        () => (listMultiMasterData.length !== 0 ? listMultiMasterData : listMasterData),
        [listMultiMasterData, listMasterData],
    );

    return <MasterBookingPage data={data} isPending={data ? isLoadingMasters : isLoadingMultiMasters} />;
}
