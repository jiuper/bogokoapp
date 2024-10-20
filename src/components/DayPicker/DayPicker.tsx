import cnBind from "classnames/bind";

import { Calendar } from "@/components/Calendar";

import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: Date) => void;
    value?: Date;
};
export const DayPicker = ({}: DayPickerProps) => {
    return (
        <div className={cx("day-picker")}>
            <Calendar />
        </div>
    );
};
