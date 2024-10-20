import { useState } from "react";
import cnBind from "classnames/bind";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import { useGetAllRecordQuery } from "@/entities/record/api/getAllRecord";
import { Cartulary } from "@/view/CalendarPage/Cartulary";

import { Calendar } from "../../components/Calendar";

import styles from "./CalendarPage.module.scss";

const cx = cnBind.bind(styles);
type CalendarPageProps = {
    companyInfo: GetCompanyDto | null;
};
export const CalendarPage = ({ companyInfo }: CalendarPageProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const { data: records } = useGetAllRecordQuery(
        selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    );

    return (
        <div className={cx("wrapper")}>
            <span className={cx("title")}>Календарь</span>
            <div className={cx("list")}>
                <Calendar onChange={onSelectHandler} dateTrue={[]} />
                <div className={cx("times")}>
                    <Cartulary records={records} companyInfo={companyInfo} />
                </div>
            </div>
        </div>
    );
};
