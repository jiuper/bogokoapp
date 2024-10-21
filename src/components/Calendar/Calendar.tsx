import cnBind from "classnames/bind";

import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import { Select } from "@/shared/ui/_Select";
import type { filterDate } from "@/view/CalendarPage";
import { useDateHandler } from "@/view/CalendarPage/useDateHandler.ts";

import styles from "./Calendar.module.scss";

const cx = cnBind.bind(styles);
type CalendarProps = {
    dateTrue?: string[];
    onChange?: (date: Date) => void;
    filterViewWeek?: filterDate[];
    filterViewDate?: filterDate;
    onChaneFilter?: (date: filterDate) => void;
};

export const Calendar = ({
    dateTrue,
    onChange,
    filterViewWeek,
    onChaneFilter,
    filterViewDate,
}: CalendarProps) => {
    const { dateTime, onChangeDate, date, days, selectedDate, formatListDate, onSelectHandler } =
        useDateHandler(filterViewDate, dateTrue, onChange);

    return (
        <div className={cx("calendar")}>
            <div className={cx("header")}>
                <span className={cx("title")}>
                    {dateTime.setLocale("ru").toFormat("LLLL yyyy")}
                </span>
                <Select
                    className={cx("select")}
                    options={filterViewWeek || []}
                    onChange={(e: filterDate) => onChaneFilter?.(e)}
                    value={filterViewDate?.title}
                />
            </div>

            <SwipeableWrapper
                onSwipedLeft={() => onChangeDate()}
                onSwipedRight={() => onChangeDate(true)}
                className={cx("content")}
            >
                {date.map((day, index) => {
                    const initDay = day.date.toLocaleDateString();
                    const today = new Date().toLocaleDateString();
                    const numberDay = new Date(day.date).getDate();
                    const selectedDay = initDay === selectedDate?.toLocaleDateString();

                    return (
                        <div className={cx("days")} key={initDay}>
                            {days.map((_, i) => {
                                if (i !== index) return null;

                                const isWeekend =
                                    new Date(day.date).getDay() === 0 ||
                                    new Date(day.date).getDay() === 6;
                                const isWorkDay = formatListDate.includes(initDay);
                                const isToday = initDay === today;

                                return (
                                    <div
                                        key={initDay}
                                        className={cx("day", {
                                            work: isWorkDay,
                                            notWork: !isWorkDay,
                                            today: isToday,
                                            weekend: isWeekend,
                                            selectedDay,
                                        })}
                                        onClick={() => onSelectHandler(day.date)}
                                    >
                                        <span className={cx("day-week")}>{day.dayOfWeek}</span>
                                        <span className={cx("day-number")}>{numberDay}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </SwipeableWrapper>
        </div>
    );
};
