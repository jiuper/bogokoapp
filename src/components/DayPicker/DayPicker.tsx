import { useState } from "react";
import { DayPicker as DayPickerReact } from "react-day-picker";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import "react-day-picker/style.css";
import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: Date) => void;
    value?: Date;
};
export const DayPicker = ({}: DayPickerProps) => {
    const [selected, setSelected] = useState<DateTime | null>(null);

    return (
        <div className={cx("day-picker")}>
            <DayPickerReact
                mode="single"
                selected={selected?.toJSDate()}
                onSelect={(date) => setSelected(date ? DateTime.fromJSDate(date) : null)}
            />
        </div>
    );
};
