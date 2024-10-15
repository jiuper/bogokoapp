import { UserRole } from "@/entities/user/types.ts";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { IndexPage } from "@/view/IndexPage/IndexPage.tsx";

export function Index() {
    const { companyInfo, userData } = useClientContext();

    return (
        <PageLayout>
            <IndexPage
                userRole={userData?.role === 50 ? UserRole.CLIENT : UserRole.MASTER}
                companyInfo={companyInfo}
            />
        </PageLayout>
    );
}
