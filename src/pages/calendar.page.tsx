import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { CalendarPage } from "@/view/CalendarPage";

export const СalendarPageIndex = () => {
    const { companyInfo } = useClientContext();
    const { data: listMaster } = useAllMastersQuery(true);

    return (
        <PageLayout>
            <CalendarPage listMaster={listMaster} companyInfo={companyInfo} />
        </PageLayout>
    );
};
