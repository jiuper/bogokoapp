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
    priceMin?: number;
    priceMax?: number;
    onClick?: (id?: string, flag?: boolean) => void;
    isChoose?: boolean;
    currencyShortTitle?: string;
    percent?: number;
};
export const ServiceCard = ({
    name,
    priceMin,
    priceMax,
    time,
    image,
    onClick,
    id,
    isChoose,
    currencyShortTitle,
    percent,
}: ServiceCardProps) => {
    return (
        <div className={cx("card")}>
            <div className={cx("header")} onClick={() => onClick?.(id, true)}>
                {percent && <span className={cx("subtitle-sale")}>{`${percent} %.`}</span>}
                <img className={cx("image")} alt="Card" src={image || notFound} />
                {time && <span className={cx("subtitle")}>{`${time} мин.`}</span>}
            </div>
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <span className={cx("title")}>{name}</span>
                </div>
                <ButtonIcon
                    onClick={() => onClick?.(id)}
                    color={isChoose ? "orange" : "empty"}
                    className={cx("button", { isChoose })}
                    icon={<SvgIcon name={isChoose ? "Checked" : "star-rate"} />}
                    label={`${percent ? (priceMin || 0) - ((priceMin || 0) / 100) * percent : priceMin}  ${
                        priceMin === priceMax ? "" : `- ${priceMax}`
                    } ${currencyShortTitle}`}
                />
            </div>
        </div>
    );
};
