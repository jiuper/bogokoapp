import { useState } from "react";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import { DayPicker } from "@/components/DayPicker";
import { SwipeableWrapper } from "@/components/SwipeableWrapper";
import { useBooleanState } from "@/shared/hooks";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick.tsx";
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
    isSelect?: boolean;
};

export const Calendar = ({
    dateTrue,
    onChange,
    filterViewWeek,
    onChaneFilter,
    filterViewDate = { value: 7, type: "weeks", title: "Неделя" },
    isSelect = true,
}: CalendarProps) => {
    const [selected, setSelected] = useState<DateTime>(DateTime.now().startOf("day"));
    const onChangeHandler = (date: DateTime) => setSelected(date);

    const { onChangeDate, date, days, selectedDate, formatListDate, onSelectHandler } =
        useDateHandler(filterViewDate?.type, filterViewDate?.value, dateTrue, onChange, selected);
    const [isOpen, , close, toggle] = useBooleanState(false);
    const ref = useOutsideClick(close);

    return (
        <div className={cx("calendar")}>
            <div className={cx("header")}>
                <div className={cx("date")} ref={ref}>
                    <span onClick={toggle} className={cx("title")}>
                        {selected.setLocale("ru").toFormat("LLLL yyyy")}
                    </span>
                    <div className={cx("day-picker-modal", isOpen && "open")}>
                        <DayPicker onChange={onChangeHandler} value={selected} />
                    </div>
                </div>
                {isSelect && (
                    <Select
                        className={cx("select")}
                        options={filterViewWeek || []}
                        onChange={(e: filterDate) => onChaneFilter?.(e)}
                        value={filterViewDate?.title}
                    />
                )}
            </div>
            <SwipeableWrapper
                onSwipedLeft={() => onChangeDate()}
                onSwipedRight={() => onChangeDate(true)}
                className={cx(
                    "content",
                    [3, 7].includes(filterViewDate?.value || 7) && isSelect && "mode",
                )}
            >
                {date.map((day, index) => {
                    const initDay = day.date.toLocaleDateString();
                    const today = new Date().toLocaleDateString();
                    const numberDay = new Date(day.date).getDate();
                    const selectedDay = initDay === selectedDate?.toLocaleDateString();

                    const isWeekend =
                        new Date(day.date).getDay() === 0 || new Date(day.date).getDay() === 6;
                    const isWorkDay = formatListDate.includes(initDay);
                    const isToday = initDay === today;

                    return (
                        <div className={cx("days")} key={initDay}>
                            {days.map((_, i) =>
                                i === index ? (
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
                                ) : null,
                            )}
                        </div>
                    );
                })}
            </SwipeableWrapper>
        </div>
    );
};
