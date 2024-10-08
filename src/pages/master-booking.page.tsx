import { useMemo } from "react";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { MasterBookingPage } from "@/view";

export function MasterBooking() {
    const { data: listMaster } = useAllMastersQuery(true);

    const listMasterData = useMemo(() => listMaster || [], [listMaster]);

    return (
        <PageLayout>
            <MasterBookingPage data={listMasterData} isServices={false} servicesId={[]} />
        </PageLayout>
    );
}
