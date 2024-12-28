import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { ServiceView } from "@/view/ServicePage/components/ServiceView";

type ServicePageProps = {
    data: GetCategoryWithServiceDto[];
};

const componentMap = {
    [`${ROUTES.SERVICE}/:id`]: (props: ServicePageProps) => <ServiceView {...props} />,
};

export const ServicePage = ({ data }: ServicePageProps) => {
    const { companyInfo } = useClientContext();
    const componentProps = {
        [`${ROUTES.SERVICE}/:id`]: {
            companyInfo,
            data,
        },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.SERVICE}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
