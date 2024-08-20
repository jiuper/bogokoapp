import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./AdressCompany.module.scss";

const cx = cnBind.bind(styles);
type AddressCompanyProps = {
    city: string;
    address: string;
    avatar: string;
    map: string;
    className?: string;
};
export const AddressCompany = ({ address, avatar, city, className }: AddressCompanyProps) => {
    return (
        <div className={cx(className, "address-company")}>
            <div className={cx("avatar-company")}>
                <img className={cx("avatar")} src={avatar} alt="avatar" />
            </div>
            <div className={cx("info")}>
                <div className={cx("map")}>
                    <SvgIcon name="place" />
                    <span className={cx("city")}>{city}</span>
                </div>
                <span className={cx("address")}>{address}</span>
            </div>
        </div>
    );
};
