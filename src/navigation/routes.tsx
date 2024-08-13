import type { ComponentType, JSX } from "react";

import { Index } from "@/pages/index.page.tsx";
import { MasterBooking } from "@/pages/master-booking.page.tsx";
import { ServicesBooking } from "@/pages/services-booking.page.tsx";

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: "/", Component: Index },
    { path: "/booking", Component: MasterBooking },
    { path: "/services", Component: ServicesBooking },
];
