import { useParams } from "react-router";

import { PageLayout } from "@/layouts/PageLayout.tsx";
import { ServicePage } from "@/view";

export const Service = () => {
    const { id } = useParams();

    return (
        <PageLayout>
            <ServicePage id={id || ""} />
        </PageLayout>
    );
};
