import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { CalendarPage } from "@/view/CalendarPage";

export const СalendarPageIndex = () => {
    const { companyInfo } = useClientContext();
    const user = useAppSelector((state) => state.account.userData);
    const { data: listMaster } = useAllMastersQuery(true);

    return (
        <PageLayout>
            <CalendarPage
                userRole={user?.role || 40}
                listMaster={listMaster}
                companyInfo={companyInfo}
            />
        </PageLayout>
    );
};
