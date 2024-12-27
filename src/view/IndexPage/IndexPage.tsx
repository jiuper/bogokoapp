import { useNavigate } from "react-router";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import type { CompanyViewProps } from "@/view/IndexPage/components/CompanyView";
import { CompanyView } from "@/view/IndexPage/components/CompanyView";

type IndexPageProps = {
    companyInfo: GetCompanyDto | null;
    personal: GetMasterFullInfoDto[];
};

const componentMap = {
    [ROUTES.MAIN]: (props: CompanyViewProps) => <CompanyView {...props} />,
};
export const IndexPage = ({ companyInfo, personal }: IndexPageProps) => {
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
                icon: "calendar-add",
                onClick: () => onClick(ROUTES.CALENDAR),
            },
        ],
    ];
    const { handleResetBooking } = useClientContextMutate();
    const onClick = (link: string) => {
        href(link);
        handleResetBooking();
    };

    const componentProps = {
        [ROUTES.MAIN]: { listLink, companyInfo, personal },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.MAIN}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
