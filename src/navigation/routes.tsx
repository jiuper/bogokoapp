import type { ComponentType, JSX } from "react";

import { Index } from "@/pages/index.page.tsx";
import { MasterBooking } from "@/pages/master-booking.page.tsx";
import { MasterInfo } from "@/pages/master-info.page.tsx";
import { IndexOrderPage } from "@/pages/order.page.tsx";
import { Service } from "@/pages/service.page.tsx";
import { ServicesBooking } from "@/pages/services-booking.page.tsx";
import { TimesBookingPage } from "@/pages/times-booking.page.tsx";
import { ROUTES } from "@/shared/const/Routes.ts";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: ROUTES.MAIN, Component: Index },
    { path: ROUTES.BOOKING, Component: MasterBooking },
    { path: ROUTES.SERVICES, Component: ServicesBooking },
    { path: `${ROUTES.SERVICE}/:id`, Component: Service },
    { path: `${ROUTES.MASTER}/:id`, Component: MasterInfo },
    { path: `${ROUTES.TIMESBOOKING}`, Component: TimesBookingPage },
    { path: `${ROUTES.ORDER}`, Component: IndexOrderPage },
];
