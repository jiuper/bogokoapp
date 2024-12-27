import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { IndexPage } from "@/view/IndexPage/IndexPage.tsx";

export function Index() {
    const { companyInfo, listMaster } = useClientContext();

    return (
        <PageLayout>
            <IndexPage companyInfo={companyInfo} personal={listMaster} />
        </PageLayout>
    );
}
