import { useMemo } from "react";
import { initBackButton } from "@telegram-apps/sdk-react";
import cnBind from "classnames/bind";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi/getAllMastersApi.ts";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";
import { MasterInfoCardSkeleton } from "@/view/MasterBookingPage/components/MasterInfoCard/MasterInfoCardSkeleton.tsx";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
export const MasterBookingPage = () => {
    const [backButton] = initBackButton();
    const { data, isPending } = useAllMastersQuery();
    const listData = useMemo(() => data || [], [data]);

    return (
        <div className={cx("wrapper", "container")}>
            <p>{backButton.isVisible}</p>
            <h2 className={cx("title")}>Специалисты</h2>
            <div className={cx("list")}>
                {!isPending
                    ? listData.map((el) => <MasterInfoCard key={el.id} {...el} />)
                    : Array(10).fill("").map((_, i) => <MasterInfoCardSkeleton key={i} />)}
            </div>
        </div>
    );
};
