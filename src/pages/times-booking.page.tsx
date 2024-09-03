import { useParams } from "react-router";

import { useAppSelector } from "@/shared/redux/configStore.ts";
import { TimesBooking } from "@/view/TimesBooking";

export const TimesBookingPage = () => {
    const queryParams = useAppSelector((state) => state.booking.bookingMasters);
    const { id } = useParams();

    return <TimesBooking masterId={id} queryParams={queryParams} />;
};
