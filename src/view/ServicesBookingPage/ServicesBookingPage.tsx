import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { ServicesBookingView } from "@/view/ServicesBookingPage/components/ServicesBookingView";

type ServicesBookingPageProps = {
    data: GetCategoryWithServiceDto[];
};
const componentMap = {
    [ROUTES.SERVICES]: (props: ServicesBookingPageProps) => <ServicesBookingView {...props} />,
};
export const ServicesBookingPage = ({ data }: ServicesBookingPageProps) => {
    const componentProps = {
        [ROUTES.SERVICES]: {
            data,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.SERVICES}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
