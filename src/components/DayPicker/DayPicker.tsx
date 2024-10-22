import { useState } from "react";
import { DayPicker as DayPickerReact } from "react-day-picker";
import cnBind from "classnames/bind";
import { ru } from "date-fns/locale";
import { DateTime } from "luxon";

import "react-day-picker/style.css";
import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: Date) => void;
    value?: Date;
};
export const DayPicker = ({}: DayPickerProps) => {
    const [selected, setSelected] = useState<DateTime>(DateTime.now().startOf("day"));

    return (
        <div className={cx("day-picker")}>
            <DayPickerReact
                locale={ru}
                mode="single"
                selected={selected?.toJSDate()}
                onSelect={(date) => (date ? setSelected(DateTime.fromJSDate(date)) : () => {})}
            />
        </div>
    );
};
