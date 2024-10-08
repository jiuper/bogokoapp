import { useNavigate } from "react-router";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./CardCalendar.module.scss";

const cx = cnBind.bind(styles);
type CardCalendarProps = {
    caption?: string;
    genPrice?: number;
    countServices?: number;
    masterInfo?: { image?: string; name?: string };
    address?: string;
    currencyShortTitle?: string;
    id?: string;
};
export const CardCalendar = ({
    address,
    caption,
    countServices,
    genPrice,
    masterInfo,
    currencyShortTitle,
    id,
}: CardCalendarProps) => {
    const href = useNavigate();

    const onClickHandler = () => {
        href(`${ROUTES.RECORD}/${id}`);
    };

    return (
        <div onClick={onClickHandler} className={cx("card-calendar")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <span className={cx("caption")}>{caption}</span>
                    <span>{`${genPrice} ${currencyShortTitle}`}</span>
                </div>
                <div className={cx("body")}>
                    <div className={cx("count-services")}>
                        <span>+{countServices}</span>
                        <SvgIcon name="personal-notebook" className={cx("icon")} />
                    </div>

                    <span>{`${genPrice} ${currencyShortTitle}`}</span>
                </div>
                <div className={cx("footer")}>
                    <div className={cx("avatar")}>
                        <Avatar src={masterInfo?.image} size={24} />
                        <span>{masterInfo?.name}</span>
                    </div>
                    <div className={cx("address")}>
                        <SvgIcon name="place" className={cx("icon")} />
                        <span>{address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
