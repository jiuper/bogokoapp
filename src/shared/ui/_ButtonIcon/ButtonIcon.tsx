import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";

import styles from "./ButtonIcon.module.scss";

const cx = cnBind.bind(styles);

export interface ButtonIconProps extends Omit<ButtonProps, "size"> {
    size?: "small";
    color?: "red" | "purple" | "empty" | "orange";
}

export const ButtonIcon = ({ className, size = "small", color = "purple", ...props }: ButtonIconProps) => {
    return <Button className={cx("button-icon", className, size, color)} text {...props} />;
};