import { useState } from "react";
import cnBind from "classnames/bind";

import { Calendar } from "@/components/Calendar";
import type { GetCompanyDto } from "@/entities/company/types.ts";
import { useGetAllRecordQuery } from "@/entities/record/api/getAllRecord";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { Cartulary } from "@/view/CalendarPage/Cartulary";

import styles from "./CalendarPage.module.scss";

const cx = cnBind.bind(styles);
type CalendarPageProps = {
    companyInfo: GetCompanyDto | null;
};
export type filterDate = { type: string; value: number; title: string };
const filterViewWeek: filterDate[] = [
    { type: "days", value: 1, title: "День" },
    { type: "days", value: 3, title: "3 Дня" },
    { type: "weeks", value: 7, title: "Неделя" },
];
export const CalendarPage = ({ companyInfo }: CalendarPageProps) => {
    const user = useAppSelector((state) => state.account.userData);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const { data: records } = useGetAllRecordQuery(
        selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    );

    const [filterViewDate, setFilterViewDate] = useState<filterDate>(filterViewWeek[0]);
    const onChaneFilter = (date: filterDate) => setFilterViewDate(date);

    return (
        <div className={cx("wrapper")}>
            <span className={cx("title")}>Календарь</span>
            <div className={cx("list")}>
                <Calendar
                    filterViewWeek={filterViewWeek}
                    filterViewDate={filterViewDate}
                    onChaneFilter={onChaneFilter}
                    onChange={onSelectHandler}
                    dateTrue={[]}
                />
                <div className={cx("times")}>
                    <Cartulary
                        viewSchedule={filterViewDate.value}
                        records={records}
                        companyInfo={companyInfo}
                        mode={user?.role || 50}
                    />
                </div>
            </div>
        </div>
    );
};
