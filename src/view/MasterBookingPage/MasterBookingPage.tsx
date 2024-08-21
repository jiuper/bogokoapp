import { useMemo, useState } from "react";
import cnBind from "classnames/bind";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi/getAllMastersApi.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";
import { MasterInfoCardSkeleton } from "@/view/MasterBookingPage/components/MasterInfoCard/MasterInfoCardSkeleton.tsx";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
export const MasterBookingPage = () => {
    const { data, isPending } = useAllMastersQuery();
    const listData = useMemo(() => data || [], [data]);
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterListData = useMemo(
        () => listData.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [listData, searchValue],
    );

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Мастера</h2>
            <InputSearch value={searchValue} onChange={setSearchValue} />
            <div className={cx("list")}>
                {!isPending
                    ? filterListData.map((el) => <MasterInfoCard key={el.id} {...el} />)
                    : Array(10)
                          .fill("")
                          .map((_, i) => <MasterInfoCardSkeleton key={i} />)}
            </div>
        </div>
    );
};
