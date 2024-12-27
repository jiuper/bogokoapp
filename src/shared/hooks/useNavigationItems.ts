import { ROUTING_MAP } from "@/shared/const/routing.ts";

export const useNavigationItems = () => {
    const role = 0;

    return ROUTING_MAP.filter(({ accessRoles }) => accessRoles.includes(role)).map(
        ({ label, link, Icon, id }) => ({ label, link, Icon, id }),
    );
};
