import { useMemo } from "react";
import { useParams } from "react-router";

import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { MasterInfoPage } from "@/view/MasterInfoPage/MasterInfoPage.tsx";

export function MasterInfo() {
    const { id } = useParams();
    const { listMaster } = useClientContext();
    const data = useMemo(
        () => listMaster.filter((el) => el.id?.toString() === id?.toString())[0],
        [listMaster, id],
    );

    return (
        <PageLayout>
            <MasterInfoPage data={data} masterId={id} />
        </PageLayout>
    );
}
