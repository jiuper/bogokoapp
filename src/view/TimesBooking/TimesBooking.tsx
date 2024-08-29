import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { Calendar } from "@/Calendar";
import { useAllTimesMasterInfoQuery } from "@/entities/order/api/getAllTimesMasterInfo";
import { useTimesMasterInfoQuery } from "@/entities/order/api/getTimesMasterInfo";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import type { BookingData } from "@/shared/redux/reducers/booking.reducer.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { TimeBooking } from "@/view/TimesBooking/components/TimeBooking";

import styles from "./TimesBooking.module.scss";

const cx = cnBind.bind(styles);
type TimesBookingProps = {
    queryParams: BookingData[] | null;
    masterId?: string;
};
export const TimesBooking = ({ queryParams, masterId }: TimesBookingProps) => {
    const dispatch = useAppDispatch();
    const href = useNavigate();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 30)));
    const filterListData = queryParams?.find((el) => el?.masterInfo?.id === masterId);
    const masters = [
        {
            masterId: filterListData?.masterInfo?.id || "",
            serviceId: filterListData?.masterInfo?.services?.map((elem) => String(elem.id) || "") || [],
        },
    ];

    const { data: singleTimeDay, isPending: loadingSingleTimeDay } = useTimesMasterInfoQuery({
        masters,
        date: selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    });
    const { data: allTimes } = useAllTimesMasterInfoQuery({
        masters,
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
    const onBooking = (time: string) => {
        dispatch(
            bookingSliceActions.setBookingMasters({
                workData: { time, date: selectedDate.toLocaleDateString() },
                masterInfo: filterListData?.masterInfo,
            }),
        );
        href(ROUTES.ORDER);
    };

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("header")}>
                <span className={cx("title")}>Выберите дату и время</span>
                <div className={cx("master-name")}>
                    <span className={cx("name")}>{queryParams?.[0].masterInfo?.name}</span>
                </div>
            </div>
            <Calendar onChange={onSelectHandler} dateTrue={dateTrue} />
            {loadingSingleTimeDay ? null : listDateTimes.length === 0 ? (
                <span>Выходной или нет свободного времени</span>
            ) : (
                <div className={cx("times")}>
                    <TimeBooking onClick={onBooking} time="11:45" listTime={listDateTimes} title="Утро" />
                    <TimeBooking onClick={onBooking} time="12:00" listTime={listDateTimes} title="День" />
                    <TimeBooking onClick={onBooking} time="18:00" listTime={listDateTimes} title="Вечер" />
                </div>
            )}
        </div>
    );
};
