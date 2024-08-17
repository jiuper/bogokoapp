import { useParams } from "react-router";

import { ServicePage } from "@/view";

export const Service = () => {
    const { id } = useParams();

    return <ServicePage id={id || ""} />;
};
