import { useMemo } from "react";
import { initBackButton } from "@telegram-apps/sdk-react";
import cnBind from "classnames/bind";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi/getAllServicesApi.ts";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";

import styles from "./ServicesBookingPage.module.scss";

const cx = cnBind.bind(styles);

export const ServicesBookingPage = () => {
    const [backButton] = initBackButton();
    const { data, isPending } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    return (
        <div className={cx("wrapper", "container")}>
            <p>{backButton.isVisible}</p>
            <h2 className={cx("title")}>Услуги</h2>
            <div className={cx("list")}>
                {!isPending
                    ? listData.map((el) => <ServiceInfoCard key={el.id} {...el} />)
                    : Array(10)
                          .fill("")
                          .map((_, i) => <ServiceInfoCard key={i} />)}
            </div>
        </div>
    );
};
