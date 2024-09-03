import { useMemo, useState } from "react";
import cnBind from "classnames/bind";

import type { GetMasterDto } from "@/entities/masters/types.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";
import { MasterInfoCardSkeleton } from "@/view/MasterBookingPage/components/MasterInfoCard/MasterInfoCardSkeleton.tsx";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoCardProps = {
    data: GetMasterDto[];
    isPending: boolean;
};
export const MasterBookingPage = ({ data, isPending }: MasterInfoCardProps) => {
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterListData = useMemo(
        () => data.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [data, searchValue],
    );

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Мастера</h2>
            <InputSearch value={searchValue} onChange={setSearchValue} />
            <div className={cx("list")}>
                {!isPending ? (
                    filterListData.length !== 0 ? (
                        filterListData.map((el) => <MasterInfoCard key={el.id} {...el} />)
                    ) : (
                        <div className={cx("not-found")}>Мастеров не найдено</div>
                    )
                ) : (
                    Array(10)
                        .fill("")
                        .map((_, i) => <MasterInfoCardSkeleton key={i} />)
                )}
            </div>
        </div>
    );
};
