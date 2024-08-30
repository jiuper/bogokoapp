import cnBind from "classnames/bind";

import notFound from "@/shared/assets/images/Empty-image-icon.png";
import { ButtonIcon } from "@/shared/ui/_ButtonIcon";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ServiceCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceCardProps = {
    id?: string;
    name?: string;
    image?: string;
    time?: string | number;
    price?: string | number;
    onClick?: (id?: string, flag?: boolean) => void;
    isChoose?: boolean;
};
export const ServiceCard = ({ name, price, time, image, onClick, id, isChoose }: ServiceCardProps) => {
    return (
        <div className={cx("card")}>
            <div className={cx("header")} onClick={() => onClick?.(id, true)}>
                <img className={cx("image")} alt="Card" src={image || notFound} />
                <span className={cx("subtitle")}>{`${time} мин.`}</span>
            </div>
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <span className={cx("title")}>{name}</span>
                </div>
                <ButtonIcon
                    onClick={() => onClick?.(id)}
                    color={isChoose ? "orange" : "purple"}
                    className={cx("button", { isChoose })}
                    icon={<SvgIcon name={isChoose ? "Checked" : "star-rate"} />}
                    label={`${price} BYN`}
                />
            </div>
        </div>
    );
};
