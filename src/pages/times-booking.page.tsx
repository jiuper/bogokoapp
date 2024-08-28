import { useAppSelector } from "@/shared/redux/configStore.ts";
import { TimesBooking } from "@/view/TimesBooking";

export const TimesBookingPage = () => {
    const queryParams = useAppSelector((state) => state.booking.bookingMasters);

    return (
        <TimesBooking
            queryParams={queryParams.map((el) => ({ ...el, serviceId: [...el.serviceId.map((id) => id.toString())] }))}
        />
    );
};
