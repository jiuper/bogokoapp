import { useState } from "react";
import cnBind from "classnames/bind";

import { Journal } from "@/components/Journal";
import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { useGetAllRecordQuery } from "@/entities/record/api/getAllRecord";
import { Cartulary } from "@/view/CalendarPage/components/Cartulary";

import styles from "./CalendarView.module.scss";

const cx = cnBind.bind(styles);
type CalendarViewProps = {
    companyInfo: GetCompanyDto | null;
    listMaster?: GetMasterDto[];
};
export type filterDate = { type: string; value: number; title: string };
const filterViewWeek: filterDate[] = [
    { type: "days", value: 1, title: "День" },
    { type: "days", value: 3, title: "3 Дня" },
    { type: "weeks", value: 7, title: "Неделя" },
];
export const CalendarView = ({ companyInfo, listMaster }: CalendarViewProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const { data: records } = useGetAllRecordQuery(
        selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    );

    const [filterViewDate, setFilterViewDate] = useState<filterDate>(filterViewWeek[2]);
    const onChaneFilter = (date: filterDate) => setFilterViewDate(date);

    return (
        <div className={cx("wrapper")}>
            <span className={cx("title")}>Журнал</span>
            <div className={cx("list")}>
                <Journal
                    filterViewWeek={filterViewWeek}
                    filterViewDate={filterViewDate}
                    onChaneFilter={onChaneFilter}
                    onChange={onSelectHandler}
                    dateTrue={[]}
                    listMaster={listMaster}
                    mode
                />
                <div className={cx("times")}>
                    <Cartulary
                        viewSchedule={filterViewDate.value}
                        records={records}
                        companyInfo={companyInfo}
                        mode={40}
                    />
                </div>
            </div>
        </div>
    );
};
