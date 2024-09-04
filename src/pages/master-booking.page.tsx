import { useMemo } from "react";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { MasterBookingPage } from "@/view";

export function MasterBooking() {
    const { data: listMaster, isPending: isLoadingMasters } = useAllMastersQuery(true);

    const listMasterData = useMemo(() => listMaster || [], [listMaster]);

    return <MasterBookingPage data={listMasterData} isPending={isLoadingMasters} isServices={false} servicesId={[]} />;
}
