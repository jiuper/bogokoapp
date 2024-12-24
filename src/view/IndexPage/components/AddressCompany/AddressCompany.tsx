import type { JSX } from "react";
import { useEffect } from "react";
import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./AddressCompany.module.scss";

const cx = cnBind.bind(styles);
type AddressCompanyProps = {
    city?: string;
    address?: string;
    map?: { lat?: number; lon?: number };
    className?: string;
    dateTime?: JSX.Element;
};
declare global {
    interface Window {
        Telegram: { WebApp?: { openLink: (url: string) => void; ready: () => void } };
    }
}

export const AddressCompany = ({
    city,
    address,
    className,
    dateTime,
    map,
}: AddressCompanyProps) => {
    const openMap = () => {
        const yandexMapUrl = `https://yandex.ru/maps/?pt=${map?.lon},${map?.lat}&z=14&l=map`;

        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.openLink(yandexMapUrl);
        } else {
            window.open(yandexMapUrl, "_blank");
        }
    };

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
        }
    }, []);

    return (
        <div className={cx(className, "address-company")}>
            <div className={cx("top")}>
                <div onClick={openMap} className={cx("info")}>
                    <span className={cx("city")}>{city}</span>
                    <div className={cx("map")}>
                        <SvgIcon name="place" />
                        <span className={cx("address")}>{address}</span>
                    </div>
                </div>
            </div>

            {dateTime ? <div className={cx("datetime")}>{dateTime}</div> : null}
        </div>
    );
};
