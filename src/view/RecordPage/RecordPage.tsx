import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { ResponseNewRecordDto } from "@/entities/record/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { RecordView } from "@/view/RecordPage/components/RecordView";

type RecordPageProps = {
    companyInfo: GetCompanyDto | null;
    data?: ResponseNewRecordDto | null;
};
const componentMap = {
    [`${ROUTES.RECORD}/:id`]: (props: RecordPageProps) => <RecordView {...props} />,
};

export const RecordPage = ({ companyInfo, data }: RecordPageProps) => {
    const componentProps = {
        [`${ROUTES.RECORD}/:id`]: {
            companyInfo,
            data,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.RECORD}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
