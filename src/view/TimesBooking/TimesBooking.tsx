import { useEffect, useMemo, useState } from "react";
import cnBind from "classnames/bind";

import { Calendar } from "@/Calendar";
import { useAllTimesMasterInfoQuery } from "@/entities/order/api/getAllTimesMasterInfo";
import { useTimesMasterInfoQuery } from "@/entities/order/api/getTimesMasterInfo";
import type { RequestMasterServicesDateTimesDto } from "@/entities/order/types.ts";
import { TimeBooking } from "@/view/TimesBooking/components/TimeBooking";

import styles from "./TimesBooking.module.scss";

const cx = cnBind.bind(styles);
type TimesBookingProps = {
    queryParams: RequestMasterServicesDateTimesDto[];
};
export const TimesBooking = ({ queryParams }: TimesBookingProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 30)));
    const { data: singleTimeDay, isPending: loadingSingleTimeDay } = useTimesMasterInfoQuery({
        masters: queryParams,
        date: selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    });
    const { data: allTimes } = useAllTimesMasterInfoQuery({
        masters: queryParams,
        dateFrom: selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
        dateTo: dateTo.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    });
    useEffect(() => {
        if (selectedDate.toLocaleDateString() === dateTo.toLocaleDateString())
            setDateTo(new Date(new Date().setDate(selectedDate.getDate() + 30)));
    }, [dateTo, selectedDate]);
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const dateTrue = useMemo(() => allTimes || [], [allTimes]);
    const listDateTimes = useMemo(() => singleTimeDay?.workData?.times || [], [singleTimeDay]);

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("header")}>
                <span className={cx("title")}>Выберите дату и время</span>
                <div className={cx("master-name")}>
                    <span className={cx("name")}>{singleTimeDay?.masterInfo?.[0].name}</span>
                </div>
            </div>
            <Calendar onChange={onSelectHandler} dateTrue={dateTrue} />
            {loadingSingleTimeDay ? null : listDateTimes.length === 0 ? (
                <span>Выходной или нет свободного времени</span>
            ) : (
                <div className={cx("times")}>
                    <TimeBooking time="11:45" listTime={listDateTimes} title="Утро" />
                    <TimeBooking time="12:00" listTime={listDateTimes} title="День" />
                    <TimeBooking time="18:00" listTime={listDateTimes} title="Вечер" />
                </div>
            )}
        </div>
    );
};
