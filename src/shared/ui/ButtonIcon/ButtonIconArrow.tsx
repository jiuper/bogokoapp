import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ButtonIconArrow.module.scss";

const cx = cnBind.bind(styles);
export type ButtonIconArrowProps = {
    icon: string;
    label: string;
    onClick?: () => void;
    arrow?: boolean;
    path?: string;
    color?: "empty" | "white";
};

export const ButtonIconArrow = ({
    icon,
    label,
    onClick,
    arrow = true,
    path,
    color = "white",
}: ButtonIconArrowProps) => {
    const href = useNavigate();

    return (
        <div className={cx("button-arrow", color)} onClick={path ? () => href(path) : onClick}>
            <div className={cx("wrapper-button")}>
                <Image className={cx("icon")} width="20" height="20" src={icon} alt={label} />
                <span>{label}</span>
            </div>
            {arrow && <SvgIcon name="ArrowRight" />}
        </div>
    );
};
