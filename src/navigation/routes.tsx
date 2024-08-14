import type { ComponentType, JSX } from "react";

import { Index } from "@/pages/index.page.tsx";
import { MasterBooking } from "@/pages/master-booking.page.tsx";
import { ServicesBooking } from "@/pages/services-booking.page.tsx";
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
];
