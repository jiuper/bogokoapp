import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { CalendarView } from "@/view/CalendarPage/components/CalendarView";

type CalendarPageProps = {
    companyInfo: GetCompanyDto | null;
    listMaster?: GetMasterDto[];
};
const componentMap = {
    [ROUTES.CALENDAR]: (props: CalendarPageProps) => <CalendarView {...props} />,
};
export const CalendarPage = ({ companyInfo, listMaster }: CalendarPageProps) => {
    const componentProps = {
        [ROUTES.CALENDAR]: { companyInfo, listMaster },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.CALENDAR}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
