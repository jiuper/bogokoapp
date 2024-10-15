import { UserRole } from "@/entities/user/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";

export const permissionsPage = [
    ROUTES.SERVICES,
    ROUTES.BOOKING,
    ROUTES.CALENDAR,
    ROUTES.PROFILE,
    ROUTES.MAIN,
    ROUTES.CHOOSEPAGE,
];

export const ROUTING = {
    PROFILE: () => ROUTES.MAIN,
    SERVICES: () => ROUTES.CHOOSEPAGE,
    MASTERS: () => ROUTES.BOOKING,
    CALENDAR: () => ROUTES.CALENDAR,
};

export const ROUTING_MAP: {
    id: string;
    label: string;
    link: string;
    accessRoles: Array<0 | UserRole>;
    Icon: string;
}[] = [
    {
        id: "1",
        label: "Главная",
        link: ROUTING.PROFILE(),
        accessRoles: [UserRole.USER, UserRole.MASTER, UserRole.CLIENT, 0],
        Icon: "home",
    },
    {
        id: "2",
        label: "Записаться",
        link: ROUTING.SERVICES(),
        accessRoles: [UserRole.USER, UserRole.MASTER, UserRole.CLIENT, 0],
        Icon: "add-circle",
    },
    {
        id: "3",
        label: "Товары",
        link: ROUTING.MASTERS(),
        accessRoles: [UserRole.USER, UserRole.MASTER, UserRole.CLIENT, 0],
        Icon: "bag-handle",
    },
    {
        id: "4",
        label: "Корзина",
        link: ROUTING.CALENDAR(),
        accessRoles: [UserRole.USER, UserRole.MASTER, UserRole.CLIENT, 0],
        Icon: "basket",
    },
];
