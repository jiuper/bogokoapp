import { useParams } from "react-router";

import { MasterInfoPage } from "@/view/MasterInfoPage/MasterInfoPage.tsx";

export function MasterInfo() {
    const { id } = useParams();

    return <MasterInfoPage masterId={id} companyId="591511" />;
}
