import { useState } from "react";
import cnBind from "classnames/bind";

import { Calendar } from "@/Calendar";

import styles from "./CalendarPage.module.scss";

const cx = cnBind.bind(styles);

export const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    console.log(selectedDate);

    return (
        <div className={cx("wrapper", "container")}>
            <span className={cx("title")}>Календарь</span>
            <div className={cx("list")}>
                <Calendar onChange={onSelectHandler} dateTrue={[]} />
                <div className={cx("times")}>
                    <span>Ваша запись</span>
                </div>
            </div>
        </div>
    );
};
