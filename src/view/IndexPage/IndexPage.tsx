import { useNavigate } from "react-router";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import { UserRole } from "@/entities/user/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { ClientView } from "@/view/IndexPage/components/ClientView";
import { MasterView } from "@/view/IndexPage/components/MasterView";

type IndexPageProps = {
    userRole: UserRole;
    companyInfo: GetCompanyDto | null;
};
export const IndexPage = ({ userRole, companyInfo }: IndexPageProps) => {
    const href = useNavigate();
    const listLink = [
        [
            { name: "Выбрать услугу", icon: "sparkles", onClick: () => onClick(ROUTES.SERVICES) },
            { name: "Выбрать мастера", icon: "add-master", onClick: () => onClick(ROUTES.BOOKING) },
        ],
        [
            { name: "Товары", icon: "bag-handle", onClick: () => onClick(ROUTES.SERVICES) },
            {
                name: "Календарь",
                icon: "personal-calendar",
                onClick: () => onClick(ROUTES.CALENDAR),
            },
        ],
    ];
    const { handleResetBooking } = useClientContextMutate();
    const onClick = (link: string) => {
        href(link);
        handleResetBooking();
    };

    return userRole === UserRole.CLIENT ? (
        <ClientView companyInfo={companyInfo} listLink={listLink} />
    ) : (
        <MasterView />
    );
};
