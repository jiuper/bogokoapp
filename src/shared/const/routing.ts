import { UserRole } from "@/entities/user/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";

export const permissionsPage = [ROUTES.SERVICES, ROUTES.BOOKING, ROUTES.CALENDAR, ROUTES.PROFILE, ROUTES.MAIN];

export const ROUTING = {
    PROFILE: () => ROUTES.PROFILE,
    SERVICES: () => ROUTES.SERVICES,
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
        label: "Кабинет",
        link: ROUTING.PROFILE(),
        accessRoles: [0],
        Icon: "personal-account",
    },
    {
        id: "2",
        label: "Услуги",
        link: ROUTING.SERVICES(),
        accessRoles: [UserRole.User, UserRole.Master, 0],
        Icon: "personal-notebook",
    },
    {
        id: "3",
        label: "Мастера",
        link: ROUTING.MASTERS(),
        accessRoles: [UserRole.User, UserRole.Master, 0],
        Icon: "personal-add",
    },
    {
        id: "4",
        label: "Календарь",
        link: ROUTING.CALENDAR(),
        accessRoles: [UserRole.User, UserRole.Master],
        Icon: "personal-calendar",
    },
];
