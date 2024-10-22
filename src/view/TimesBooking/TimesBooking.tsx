import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { Calendar } from "@/components/Calendar";
import { useAllTimesMasterInfoQuery } from "@/entities/order/api/getAllTimesMasterInfo";
import { useTimesMasterInfoQuery } from "@/entities/order/api/getTimesMasterInfo";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { BookingData } from "@/shared/context/ClientProvider.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { TimeBooking } from "@/view/TimesBooking/components/TimeBooking";

import styles from "./TimesBooking.module.scss";

const cx = cnBind.bind(styles);
type TimesBookingProps = {
    data?: BookingData;
    handleAddWorkDateBooking?: (date: string, time: string) => void;
};
export const TimesBooking = ({ data, handleAddWorkDateBooking }: TimesBookingProps) => {
    const href = useNavigate();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(
        new Date(new Date().setDate(new Date().getDate() + 30)),
    );
    const masters = [
        {
            masterId: data?.masterInfo?.id || "",
            serviceId: data?.masterInfo?.services?.map((elem) => String(elem.id) || "") || [],
        },
    ];

    const { data: singleTimeDay, isPending: loadingSingleTimeDay } = useTimesMasterInfoQuery({
        masters,
        date: selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    });
    const { data: allTimes } = useAllTimesMasterInfoQuery({
        masters,
        dateFrom: selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").join("-"),
        dateTo: dateTo.toLocaleDateString().replace(/[.]/g, "-").split("-").join("-"),
    });
    useEffect(() => {
        if (selectedDate.toLocaleDateString() === dateTo.toLocaleDateString())
            setDateTo(new Date(new Date().setDate(selectedDate.getDate() + 30)));
    }, [dateTo, selectedDate]);
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const dateTrue = useMemo(() => allTimes || [], [allTimes]);
    const listDateTimes = useMemo(() => singleTimeDay?.workData?.times || [], [singleTimeDay]);
    const onBooking = (time: string) => {
        href(ROUTES.ORDER);
        handleAddWorkDateBooking?.(
            selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
            time,
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <span className={cx("title")}>Выберите дату и время</span>
                <div className={cx("master-name")}>
                    <span className={cx("name")}>{data?.masterInfo?.name}</span>
                </div>
            </div>
            <div className={cx("content")}>
                <Calendar isSelect={false} onChange={onSelectHandler} dateTrue={dateTrue} />
                {loadingSingleTimeDay ? null : listDateTimes.length === 0 ? (
                    <div className={cx("times-not")}>
                        <span className={cx("caption")}>
                            На {selectedDate.toLocaleDateString()} не записаться
                        </span>
                        <span className={cx("title")}>Выберите другую дату или услугу</span>
                        <div onClick={() => href(-1)} className={cx("back")}>
                            <SvgIcon name="back" />
                            <span>Вернуться к услугам</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx("times")}>
                        <TimeBooking
                            onClick={onBooking}
                            time="11:45"
                            listTime={listDateTimes}
                            title="Утро"
                        />
                        <TimeBooking
                            onClick={onBooking}
                            time="12:00"
                            listTime={listDateTimes}
                            title="День"
                        />
                        <TimeBooking
                            onClick={onBooking}
                            time="18:00"
                            listTime={listDateTimes}
                            title="Вечер"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
