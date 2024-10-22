import { useState } from "react";
import { DayPicker as DayPickerReact } from "react-day-picker";
import cnBind from "classnames/bind";
import { ru } from "date-fns/locale";
import { DateTime } from "luxon";

import "react-day-picker/style.css";
import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: DateTime) => void;
    value?: DateTime;
};
export const DayPicker = ({ value, onChange }: DayPickerProps) => {
    const [selected, setSelected] = useState<DateTime>(value || DateTime.now().startOf("day"));
    const onChangeHandler = (date: DateTime) => {
        setSelected(date);
        onChange?.(date);
    };

    return (
        <div className={cx("day-picker")}>
            <DayPickerReact
                locale={ru}
                mode="single"
                selected={selected?.toJSDate()}
                onSelect={(date) => (date ? onChangeHandler(DateTime.fromJSDate(date)) : () => {})}
            />
        </div>
    );
};
