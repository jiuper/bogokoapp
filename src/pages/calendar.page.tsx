import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { CalendarPage } from "@/view/CalendarPage";

export const СalendarPageIndex = () => {
    const { companyInfo } = useClientContext();

    return (
        <PageLayout>
            <CalendarPage companyInfo={companyInfo} />
        </PageLayout>
    );
};
