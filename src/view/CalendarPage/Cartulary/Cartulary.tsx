import { useState } from "react";
import cnBind from "classnames/bind";
import type { DateTime } from "luxon";

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

export const Cartulary = ({ records, companyInfo }: CartularyProps) => {
    // const timeInterval: number[] = useMemo(() => Array.from(Array(cur)), [cur]);

    const filteredResult = useCartulary(records);
    const [a, setA] = useState(false);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("area")}>
                <div className={cx("cartulary")}>
                    <div className={cx("actualTime")} />
                    <div className={cx("timeline")}>
                        {filteredResult.map((el, index) => {
                            const isFeed = false;

                            return (
                                <div
                                    key={index}
                                    className={cx("time", el ? "actives" : "")}
                                    style={{ color: "black" }}
                                >
                                    {typeof el !== "number" ? (
                                        <div
                                            className={cx(
                                                a && isFeed
                                                    ? "isFeed"
                                                    : a && !isFeed
                                                      ? "isNotFeed"
                                                      : "",
                                            )}
                                        >
                                            <span className={cx("item")}>{el?.start}</span>
                                            <span className={cx("item")}>{el?.end}</span>
                                        </div>
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
                            return <div className={cx("cell")} key={i} />;
                        }
                        const filteredRecords = records?.filter((_, i) => i === el.index);
                        const isFeed = false;

                        return filteredRecords?.map((record, index) => (
                            <div
                                className={cx(
                                    "cell",
                                    a && isFeed ? "isFeed" : a && !isFeed ? "isNotFeed" : "",
                                )}
                                key={index}
                                onClick={() => setA(!a)}
                            >
                                <CardCalendar
                                    id={record.id}
                                    currencyShortTitle={companyInfo?.currencyShortTitle}
                                    genPrice={record.totalPriceMax}
                                    caption={record.servicesName[0]}
                                    address={`${companyInfo?.city}, ${companyInfo?.address}`}
                                    masterInfo={{
                                        name: record.masterName,
                                        image: record.masterImage,
                                    }}
                                    countServices={record.servicesName.length}
                                    isFeedback={!isFeed}
                                />
                            </div>
                        ));
                    })}
                </div>
            </div>
        </div>
    );
};
