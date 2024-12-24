import type { JSX } from "react";
import { useEffect } from "react";
import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./AdressCompany.module.scss";

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
    const endCoords1 = `${map?.lat}`;
    const endCoords2 = `${map?.lon}`;
    const openMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = `${position.coords.latitude},${position.coords.longitude}`;
                    const yandexMapUrl = `https://yandex.ru/maps/?rtext=${userCoords}~${endCoords1}~${endCoords2}&rtt=auto`;

                    if (window.Telegram?.WebApp) {
                        window.Telegram.WebApp.openLink(yandexMapUrl);
                    } else {
                        window.open(yandexMapUrl, "_blank");
                    }
                },
                (error) => {
                    console.error("Ошибка при определении местоположения", error);
                    alert("Не удалось определить ваше местоположение.");
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        } else {
            alert("Геолокация не поддерживается вашим браузером.");
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
