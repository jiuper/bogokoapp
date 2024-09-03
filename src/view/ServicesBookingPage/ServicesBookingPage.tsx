import { useMemo, useState } from "react";
import cnBind from "classnames/bind";

import type { GetAllServicesApiResponse } from "@/entities/services/api/getAllServicesApi/types.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";
import { ServiceCardSkeleton } from "@/view/ServicesBookingPage/components/ServiceInfoCard/ServiceCardSkeleton.tsx";

import styles from "./ServicesBookingPage.module.scss";

const cx = cnBind.bind(styles);

type ServiceInfoCardProps = {
    data: GetAllServicesApiResponse;
    isPending: boolean;
};
export const ServicesBookingPage = ({ data, isPending }: ServiceInfoCardProps) => {
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterListData = useMemo(
        () => data.filter((el) => el.name?.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [data, searchValue],
    );

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Услуги</h2>
            <InputSearch value={searchValue} onChange={setSearchValue} />
            <div className={cx("list")}>
                {!isPending ? (
                    filterListData.length !== 0 ? (
                        filterListData.map((el) => <ServiceInfoCard key={el.id} {...el} />)
                    ) : (
                        <div className={cx("not-found")}>Мастеров не найдено</div>
                    )
                ) : (
                    Array(10)
                        .fill("")
                        .map((_, i) => <ServiceCardSkeleton key={i} />)
                )}
            </div>
        </div>
    );
};
