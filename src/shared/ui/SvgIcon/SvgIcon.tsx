import cnBind from "classnames/bind";

import type { SvgIconPropTypes } from "./SvgIcon.type";

import styles from "./style.module.scss";
import svgPath from "@/shared/assets/icon/sprite.svg"
const cx = cnBind.bind(styles);
export const SvgIcon = ({ width = 24, height = 24, name, className }: SvgIconPropTypes) => {
    return (
        <svg className={cx(className)} width={width} height={height}>
            <use xlinkHref={`${svgPath}#${name}`} />
        </svg>
    );
};
