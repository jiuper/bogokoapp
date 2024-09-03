import { useParams } from "react-router";

import { useMasterQuery } from "@/entities/masters/api/getMasterApi";
import { MasterInfoPage } from "@/view/MasterInfoPage/MasterInfoPage.tsx";

export function MasterInfo() {
    const { id } = useParams();
    const { data } = useMasterQuery({ masterId: id, companyId: "591511" });

    return <MasterInfoPage data={data} masterId={id} />;
}
