import { useMemo, useState } from "react";
import { eachDayOfInterval, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { DateTime, Info } from "luxon";

import type { filterDate } from "@/view/CalendarPage/CalendarPage.tsx";

type DateInfo = {
    date: Date;
    dayOfWeek: string;
};
export const useDateHandler = (
    filterViewDate?: filterDate,
    dateTrue?: string[],
    onChange?: (date: Date) => void,
) => {
    const [dateTime, setDateTime] = useState(DateTime.now().startOf("day"));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getDays = () => [...Info.weekdays("short")];

    const formatListDate = useMemo(
        () => (dateTrue ? dateTrue.map((el) => new Date(el).toLocaleDateString()) : []),
        [dateTrue],
    );

    const days = useMemo(() => getDays(), []);

    const startWeek = startOfWeek(dateTime.toISO() || new Date(), {
        weekStartsOn: 1,
    });
    const endWeek = endOfWeek(dateTime.toISO() || new Date(), { weekStartsOn: 1 });

    const getWeekDates = (): DateInfo[] => {
        return eachDayOfInterval({
            start: startWeek,
            end: endWeek,
        }).map((date) => ({
            date,
            dayOfWeek: new Date(date).toLocaleDateString("ru-RU", { weekday: "short" }),
        }));
    };

    const getDayOrThreeDates = (): DateInfo[] => {
        const day = startOfDay(dateTime.toISO() || new Date());

        return eachDayOfInterval({
            start: day,
            end: dateTime.plus({ days: filterViewDate?.value }).toISO() || new Date(),
        })
            .slice(0, [1, 3].includes(filterViewDate?.value || 1) ? filterViewDate?.value : 1)
            .map((date) => ({
                date,
                dayOfWeek: new Date(date).toLocaleDateString("ru-RU", { weekday: "short" }),
            }));
    };

    const date = useMemo(() => {
        if (filterViewDate?.value === 7) {
            return getWeekDates();
        }

        return getDayOrThreeDates();
    }, [startWeek, endWeek, filterViewDate]);

    const onChangeDate = (operator = false) => {
        const type = filterViewDate?.type || "weeks";
        const value = filterViewDate?.value === 7 ? 1 : filterViewDate?.value;
        setDateTime(
            operator ? dateTime.minus({ [type]: value }) : dateTime.plus({ [type]: value }),
        );
    };

    const onSelectHandler = (date: Date) => {
        setSelectedDate(date);
        onChange?.(date);
    };

    return {
        dateTime,
        selectedDate,
        days,
        date,
        formatListDate,
        onChangeDate,
        onSelectHandler,
    };
};