import { useState } from "react";
import type { SelectProps } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import type { SelectItem } from "primereact/selectitem";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./Select.module.scss";

const cx = cnBind.bind(styles);
export interface UISelectProps extends Omit<SelectProps, "children" | "onChange"> {
    label?: string;
    rootClassName?: string;
    icon?: boolean;
    error?: string;
    isFullWidth?: boolean;
    options: SelectItem[];
    onChange?: (value: string) => void;
}
export const Select = ({
    value,
    options,
    label,
    error,
    rootClassName,
    icon = true,
    isFullWidth,
    onChange,
    className,
}: UISelectProps) => {
    const [isShowMenu, show] = useState(false);

    const handleDropdownShow = () => show(!isShowMenu);

    return (
        <div
            onClick={handleDropdownShow}
            className={cx("dropdown", { rootClassName, isFullWidth, error, isShowMenu }, className)}
        >
            {label && <span className={cx("label", { isShowMenu, error })}>{label}</span>}
            <div className={cx("select")}>
                <span className={cx("title", { isShowMenu, error })}>{value}</span>
                <div className={cx("options", { isShowMenu })}>
                    {options.map(({ value, title }, index) => (
                        <span
                            onClick={() => onChange?.(value as string)}
                            className={cx("option")}
                            key={index}
                        >
                            {title}
                        </span>
                    ))}
                </div>
                {icon && <SvgIcon name="ArrowDown" className={cx("icon", { isShowMenu })} />}
            </div>
        </div>
    );
};
