import { NavigationLayout } from "@/layouts/NavigationLayout";
import booking from "@/shared/assets/booking.png";
import services from "@/shared/assets/services.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { ChooseViewProps } from "@/view/ChoosePage/components/ChooseView";
import { ChooseView } from "@/view/ChoosePage/components/ChooseView";

const componentMap = {
    [ROUTES.CHOOSEPAGE]: (props: ChooseViewProps) => <ChooseView {...props} />,
};
export const ChoosePage = () => {
    const listLink = [
        {
            title: "Мастера",
            desc: "Вы можете выбрать одного из доступных мастеров в нашем салоне, после чего перейдите к выбору услуг, которые он предлагает",
            src: booking,
            href: ROUTES.BOOKING,
        },
        {
            title: "Услуги",
            desc: "Выберите желаемую услугу, после чего сможете выбрать мастера, который ее выполнит для вас",
            src: services,
            href: ROUTES.SERVICES,
        },
    ];

    const componentProps = {
        [ROUTES.CHOOSEPAGE]: { listLink },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.CHOOSEPAGE}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
