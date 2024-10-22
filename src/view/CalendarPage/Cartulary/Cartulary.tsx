import { createRef, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { ResponseGetRecordShortInfoDto } from "@/entities/record/types.ts";
import { UserRole } from "@/entities/user/types.ts";
import { useModalContextMutate } from "@/shared/helper";
import { CardCalendar } from "@/view/CalendarPage/CardCalendar";
import { useCartulary } from "@/view/CalendarPage/Cartulary/useCartulary.ts";

import styles from "./Cartulary.module.scss";

const cx = cnBind.bind(styles);
type CartularyProps = {
    records?: ResponseGetRecordShortInfoDto[];
    companyInfo?: GetCompanyDto | null;
    viewSchedule: number;
    mode: UserRole.CLIENT | UserRole.MASTER | UserRole.ADMIN;
};

export const Cartulary = ({ records, companyInfo, viewSchedule, mode }: CartularyProps) => {
    const actualTimeRef = createRef<HTMLDivElement>();
    const [time, setTime] = useState(() => {
        return DateTime.now().hour * 60 + DateTime.now().minute;
    });
    const filteredResult = useCartulary(records);
    const { openRecordAddModal } = useModalContextMutate();

    const [open, setOpen] = useState(false);
    const [feedBack, setFeedBack] = useState(false);
    const [indexRecord, setIndexRecord] = useState(0);

    const handleIsFeed = (index: number, isFeed: boolean = false) => {
        setOpen((prevOpen) => (indexRecord === index ? !prevOpen : prevOpen));
        setIndexRecord(index);
        setFeedBack(isFeed);
    };

    useEffect(() => {
        const scroll = () => {
            actualTimeRef.current?.scrollIntoView({
                block: "center",
                inline: "nearest",
                behavior: "smooth",
            });
        };

        const interval = setInterval(() => {
            const now = DateTime.now();
            setTime(now.hour * 60 + now.minute);
            scroll();
        }, 1000 * 30);

        scroll();

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={cx("wrapper")}>
            <DndProvider backend={HTML5Backend}>
                <div className={cx("area")}>
                    <div
                        ref={actualTimeRef}
                        className={cx("actualTime")}
                        style={{ top: `${time - 130}px` }}
                    />
                    <div className={cx("cartulary")}>
                        <div className={cx("timeline")}>
                            {filteredResult.map((el, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx("time", el ? "actives" : "")}
                                        style={{ color: "black" }}
                                    >
                                        {typeof el !== "number" ? (
                                            <div
                                                className={cx(
                                                    open && (feedBack ? "isNotFeed" : "isFeed"),
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
                    <div className={cx("schedule")}>
                        {filteredResult.map((el, i) => {
                            const view = mode === UserRole.CLIENT ? 1 : viewSchedule;

                            if (typeof el === "number") {
                                return (
                                    <div
                                        className={cx("cell")}
                                        key={i}
                                        onClick={
                                            mode === UserRole.CLIENT
                                                ? () => {}
                                                : () => openRecordAddModal
                                        }
                                    >
                                        {Array.from({ length: view }).map((_, index) => (
                                            <div className={cx("cell-row")} key={`${index}-${i}`} />
                                        ))}
                                    </div>
                                );
                            }
                            const filteredRecords = records?.filter((_, i) => i === el.index);

                            return filteredRecords?.map((record, indexR) => (
                                <div
                                    className={cx(
                                        "cell",
                                        open && (feedBack ? "isNotFeed" : "isFeed"),
                                    )}
                                    key={indexR}
                                    onClick={() => handleIsFeed(indexR, true)}
                                >
                                    {Array.from({
                                        length: view,
                                    }).map((_, index) =>
                                        indexR === index ? (
                                            <div key={index} className={cx("cell-2")}>
                                                <CardCalendar
                                                    id={record.id}
                                                    currencyShortTitle={
                                                        companyInfo?.currencyShortTitle
                                                    }
                                                    genPrice={record.totalPriceMax}
                                                    caption={record.servicesName[0]}
                                                    address={`${companyInfo?.city}, ${companyInfo?.address}`}
                                                    masterInfo={{
                                                        name: record.masterName,
                                                        image: record.masterImage,
                                                    }}
                                                    countServices={record.servicesName.length}
                                                    isFeedback
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={cx("cell-row")}
                                                key={`${index}-${i}`}
                                                onClick={
                                                    mode === UserRole.CLIENT
                                                        ? () => {}
                                                        : () => openRecordAddModal
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            ));
                        })}
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};
