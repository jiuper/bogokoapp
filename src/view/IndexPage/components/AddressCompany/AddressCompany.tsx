import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./AdressCompany.module.scss";

const cx = cnBind.bind(styles);
type AddressCompanyProps = {
    city?: string;
    map: string;
    className?: string;
    dateTime?: { date: string; time: string };
};
export const AddressCompany = ({ city, className, dateTime }: AddressCompanyProps) => {
    return (
        <div className={cx(className, "address-company")}>
            <div className={cx("top")}>
                <div className={cx("info")}>
                    <div className={cx("map")}>
                        <SvgIcon name="place" />
                        <span className={cx("city")}>{city}</span>
                    </div>
                </div>
            </div>

            {dateTime ? (
                <div className={cx("date")}>
                    <span className={cx("date-text")}>{dateTime.date}</span>
                    <span className={cx("time-text")}>{dateTime.time}</span>
                </div>
            ) : null}
        </div>
    );
};
