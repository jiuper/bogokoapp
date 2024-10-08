import { useNavigate } from "react-router";

import { UserRole } from "@/entities/user/types.ts";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { IndexPage } from "@/view/IndexPage/IndexPage.tsx";

export function Index() {
    const href = useNavigate();
    const { companyInfo, userData } = useClientContext();
    const { handleResetBooking } = useClientContextMutate();

    const listLink = [
        { name: "Выбрать услугу", icon: "notebook", onClick: () => onClick(ROUTES.SERVICES) },
        { name: "Выбрать мастера", icon: "add-master", onClick: () => onClick(ROUTES.BOOKING) },
    ];
    const onClick = (link: string) => {
        href(link);
        handleResetBooking();
    };

    return (
        <PageLayout>
            <IndexPage
                userRole={userData?.role === 50 ? UserRole.CLIENT : UserRole.MASTER}
                companyInfo={companyInfo}
                listLink={listLink}
            />
        </PageLayout>
    );
}
