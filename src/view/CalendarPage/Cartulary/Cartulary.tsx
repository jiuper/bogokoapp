import { useState } from "react";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { ResponseGetRecordShortInfoDto } from "@/entities/record/types.ts";
import { CardCalendar } from "@/view/CalendarPage/CardCalendar";
import { useCartulary } from "@/view/CalendarPage/Cartulary/useCartulary.ts";

import styles from "./Cartulary.module.scss";

const cx = cnBind.bind(styles);
type CartularyProps = {
    dateTime?: DateTime;
    onUpdateTime?: (id: number, iso: string) => void;
    onUpdateDuration?: (id: number, minutes: number) => void;
    onClick?: (id: number) => void;
    onAdd?: (id: number, minutes: number) => void;
    plugSize?: number;
    classNames?: string;
    cur?: number;
    records?: ResponseGetRecordShortInfoDto[];
    companyInfo?: GetCompanyDto | null;
};
const date = (iso?: string): DateTime => {
    return iso ? DateTime.fromISO(iso) : DateTime.now();
};

export const Cartulary = ({ records, companyInfo }: CartularyProps) => {
    const [time] = useState(Math.abs(date().startOf("day").diff(date(), "minutes").minutes));
    // const timeInterval: number[] = useMemo(() => Array.from(Array(cur)), [cur]);

    const filteredResult = useCartulary(records);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <span className={cx("title", "cartulary")}>Время</span>
                <span className={cx("title", "shedule")}>Ваша запись</span>
            </div>
            <div className={cx("area")}>
                <div className={cx("cartulary")}>
                    <div className={cx("actualTime")} style={{ top: `${time * 2}px` }} />
                    <div className={cx("timeline")}>
                        {filteredResult.map((el, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx("time", el ? "active" : "")}
                                    style={{ top: `${index * 5}%`, color: "black" }}
                                >
                                    {typeof el !== "number" ? (
                                        <>
                                            <span className={cx("item")}>{el?.start}</span>
                                            <span className={cx("item")}>
                                                {el?.end.toString().slice(0, 5)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className={cx("item")}>{`${el}:00`}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx("shedule")}>
                    {filteredResult.map((el, i) => {
                        if (typeof el === "number") {
                            return (
                                <div style={{ opacity: 0 }} className={cx("cell")} key={i}>
                                    <span>{i}</span>
                                </div>
                            );
                        }
                        const filteredRecords = records?.filter((_, i) => i === el.index);
                        console.log(filteredRecords);

                        return filteredRecords?.map((record, index) => (
                            <CardCalendar
                                key={index}
                                id={record.id}
                                currencyShortTitle={companyInfo?.currencyShortTitle}
                                genPrice={record.totalPriceMax}
                                caption={record.servicesName[0]}
                                address={`${companyInfo?.city}, ${companyInfo?.address}`}
                                masterInfo={{ name: record.masterName, image: record.masterImage }}
                                countServices={record.servicesName.length}
                            />
                        ));
                    })}
                </div>
            </div>
        </div>
    );
};
