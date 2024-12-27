import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import type { MasterInfoViewProps } from "@/view/MasterInfoPage/components/MasterInfoView";
import { MasterInfoView } from "@/view/MasterInfoPage/components/MasterInfoView";

type MasterInfoPageProps = {
    data: GetMasterFullInfoDto;
    masterId?: string;
};

const componentMap = {
    [`${ROUTES.MASTER}/:id`]: (props: MasterInfoViewProps) => <MasterInfoView {...props} />,
};

export const MasterInfoPage = ({ data, masterId }: MasterInfoPageProps) => {
    const { companyInfo } = useClientContext();
    const { handleAddMasterBooking } = useClientContextMutate();

    const componentProps = {
        [`${ROUTES.MASTER}/:id`]: {
            companyInfo,
            masterId,
            handleAddMasterBooking,
            data,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.MASTER}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
