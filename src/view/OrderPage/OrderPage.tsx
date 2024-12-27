import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { OrderViewProps } from "@/view/OrderPage/components/OrderView";
import { OrderView } from "@/view/OrderPage/components/OrderView";

const componentMap = {
    [ROUTES.ORDER]: (props: OrderViewProps) => <OrderView {...props} />,
};

export const OrderPage = ({
    handleEditBooking,
    booking,
    currencyShortTitle,
    handleRemoveServiceBooking,
    handleResetBooking,
    masterInfo,
}: OrderViewProps) => {
    const componentProps = {
        [ROUTES.ORDER]: {
            handleEditBooking,
            booking,
            currencyShortTitle,
            handleRemoveServiceBooking,
            handleResetBooking,
            masterInfo,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.ORDER}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
