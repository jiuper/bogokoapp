import { useMemo } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Button } from "@/shared/ui/_Button";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";

import styles from "./ServiceSetting.module.scss";

const cx = cnBind.bind(styles);

export const ServiceSetting = () => {
    const href = useNavigate();
    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    return (
        <div className={cx("service-setting")}>
            <div className={cx("wrapper", "container")}>
                <h2 className={cx("title")}>Услуги</h2>
                <div className={cx("list")}>
                    {listData.map((el) => (
                        <ServiceInfoCard
                            url={`${ROUTES.SETTING}/serviceDetail`}
                            key={el.id}
                            {...el}
                        />
                    ))}
                </div>
            </div>
            <div className={cx("button")}>
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => href(ROUTES.SETTING)}
                    label="К настройкам"
                />
            </div>
        </div>
    );
};
