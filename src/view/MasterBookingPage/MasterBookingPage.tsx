import type { GetMasterDto } from "@/entities/masters/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { MasterBookingView } from "@/view/MasterBookingPage/components/MasterBookingView";

type MasterInfoCardProps = {
    data: GetMasterDto[];
    isPending?: boolean;
    isServices?: boolean;
    servicesId: string[];
    addMasterBooking?: (masterId: string) => void;
};
const componentMap = {
    [ROUTES.BOOKING]: (props: MasterInfoCardProps) => <MasterBookingView {...props} />,
};
export const MasterBookingPage = ({
    data,
    isPending,
    isServices,
    addMasterBooking,
    servicesId,
}: MasterInfoCardProps) => {
    const componentProps = {
        [ROUTES.BOOKING]: { data, isPending, isServices, addMasterBooking, servicesId },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.BOOKING}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
