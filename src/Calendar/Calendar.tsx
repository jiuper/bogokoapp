import { useState } from "react";
import cnBind from "classnames/bind";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { DateTime, Info } from "luxon";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./Calendar.module.scss";

const cx = cnBind.bind(styles);

export const Calendar = () => {
    const [dateTime, setDateTime] = useState<DateTime>(DateTime.now().startOf("day"));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const getDays = () => [...Info.weekdays("short")];

    const listDate = ["2024-08-22", "2024-08-23", "2024-08-26", "2024-08-27", "2024-08-30", "2024-08-31"];
    const formatListDate = listDate.map((el) => new Date(el).toLocaleDateString());
    const trans = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const [days] = useState(getDays());
    const startWeek = startOfWeek(dateTime.toISO() || new Date(), {
        weekStartsOn: 1,
    });
    const endWeek = endOfWeek(dateTime.toISO() || new Date(), { weekStartsOn: 1 });
    const date = eachDayOfInterval({
        start: startWeek,
        end: endWeek,
    });

    const onPlusHandler = (type = "week", value = 1) => setDateTime(dateTime.plus({ [type]: value }));
    const onMinusHandler = (type = "week", value = 1) => setDateTime(dateTime.minus({ [type]: value }));
    const onSelectHandler = (date: Date) => setSelectedDate(date);

    return (
        <div className={cx("calendar")}>
            <div className={cx("header")}>
                <span className={cx("title")}>{dateTime.setLocale("ru").toFormat("LLLL yyyy")}</span>
                <div className={cx("buttons")}>
                    <SvgIcon className={cx("prev")} name="ArrowRight" onClick={() => onMinusHandler()} />
                    <SvgIcon className={cx("next")} name="ArrowRight" onClick={() => onPlusHandler()} />
                </div>
            </div>

            <div className={cx("content")}>
                {date.map((day, index) => {
                    const initDay = day.toLocaleDateString();
                    const today = new Date().toLocaleDateString();
                    const numberDay = new Date(day).getDate();
                    const selectedDay = initDay === selectedDate?.toLocaleDateString();

                    return (
                        <div className={cx("days")} key={initDay}>
                            {days.map((_, i) =>
                                i === index ? (
                                    <div
                                        key={day.toLocaleDateString()}
                                        className={cx("day", {
                                            work: formatListDate.includes(initDay),
                                            notWork: !formatListDate.includes(initDay),
                                            today: initDay === today,
                                            weekend: new Date(day).getDay() === 0 || new Date(day).getDay() === 6,
                                            selectedDay,
                                        })}
                                        onClick={() => onSelectHandler(day)}
                                    >
                                        <span className={cx("day-week")}>{trans[i]}</span>
                                        <span className={cx("day-number")}>{numberDay}</span>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
