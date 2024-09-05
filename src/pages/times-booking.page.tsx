import { useParams } from "react-router";

import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { TimesBooking } from "@/view/TimesBooking";

export const TimesBookingPage = () => {
    const queryParams = useAppSelector((state) => state.booking.bookingMasters);
    const { id } = useParams();

    return (
        <PageLayout>
            <TimesBooking masterId={id} queryParams={queryParams} />
        </PageLayout>
    );
};
