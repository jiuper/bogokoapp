import { useMemo, useState } from "react";
import cnBind from "classnames/bind";

import type { GetAllServicesApiResponse } from "@/entities/services/api/getAllServicesApi/types.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";

import styles from "./ServicesBookingPage.module.scss";

const cx = cnBind.bind(styles);

type ServiceInfoCardProps = {
    data: GetAllServicesApiResponse;
};
export const ServicesBookingPage = ({ data }: ServiceInfoCardProps) => {
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
                {filterListData.length !== 0 ? (
                    filterListData.map((el) => <ServiceInfoCard key={el.id} {...el} />)
                ) : (
                    <div className={cx("not-found")}>Данной категории услуг нет</div>
                )}
            </div>
        </div>
    );
};
