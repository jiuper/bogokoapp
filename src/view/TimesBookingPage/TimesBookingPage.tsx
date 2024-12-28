import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { BookingData } from "@/shared/context/ClientProvider.tsx";
import { TimesBookingView } from "@/view/TimesBookingPage/components/TimesBookingView";

type TimesBookingPageProps = {
    data?: BookingData;
    handleAddWorkDateBooking?: (date: string, time: string) => void;
};
const componentMap = {
    [`${ROUTES.TIMESBOOKING}/:id`]: (props: TimesBookingPageProps) => (
        <TimesBookingView {...props} />
    ),
};
export const TimesBookingPage = ({ data, handleAddWorkDateBooking }: TimesBookingPageProps) => {
    const componentProps = {
        [`${ROUTES.TIMESBOOKING}/:id`]: {
            data,
            handleAddWorkDateBooking,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.TIMESBOOKING}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
