import { useMemo } from "react";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ServicesBookingPage } from "@/view";

export function ServicesBooking() {
    const { data, isPending } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    return <ServicesBookingPage data={listData} isPending={isPending} />;
}
