import { useMemo, useState } from "react";
import { Accordion } from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";

import styles from "./TimeBooking.module.scss";

const cx = cnBind.bind(styles);
type TimeBookingProps = {
    title: string;
    listTime: string[];
    time: string;
};
export const TimeBooking = ({ listTime, title, time }: TimeBookingProps) => {
    const [selectedDate, setSelectedDate] = useState<boolean>(false);

    const titleTrue = useMemo(
        () => (listTime.some((el) => (title === "Утро" ? el <= time : el >= time)) ? title : null),
        [listTime, time, title],
    );

    return (
        <div className={cx("time-booking")}>
            {titleTrue ? (
                <Accordion expanded={selectedDate} onChange={setSelectedDate}>
                    <AccordionSummary>{titleTrue}</AccordionSummary>
                    <AccordionContent className={cx("content")}>
                        <div className={cx("time")}>
                            {listTime.map((el) =>
                                (title === "Утро" && el <= time) ||
                                (title === "День" && el >= time && el <= "17:45") ||
                                (title === "Вечер" && el >= time) ? (
                                    <Link className={cx("item")} key={el} to={ROUTES.ORDER}>
                                        <span className={cx("title")}>{el}</span>
                                    </Link>
                                ) : null,
                            )}
                        </div>
                    </AccordionContent>
                </Accordion>
            ) : null}
        </div>
    );
};
