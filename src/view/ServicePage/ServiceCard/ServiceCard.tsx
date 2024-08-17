import cnBind from "classnames/bind";
import { Button } from "primereact/button";

import notFound from "@/shared/assets/images/Empty-image-icon.png";

import styles from "./ServiceCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceCardProps = {
    id?: string;
    name?: string;
    image?: string;
    time?: number;
    price?: number;
    onClick?: (id?: string) => void;
};
export const ServiceCard = ({ name, price, time, image, onClick, id }: ServiceCardProps) => {
    return (
        <div className={cx("card")}>
            <div className={cx("header")} onClick={() => onClick?.(id)}>
                <img className={cx("image")} alt="Card" src={image || notFound} />
                <span className={cx("subtitle")}>{`${time} мин.`}</span>
            </div>
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <span className={cx("title")}>{name}</span>
                </div>
                <Button className={cx("button")} label={`+ ${price} BYN`} />
            </div>
        </div>
    );
};
