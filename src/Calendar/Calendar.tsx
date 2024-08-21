import { useState } from "react";
import cnBind from "classnames/bind";
import { DateTime, Info } from "luxon";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./Calendar.module.scss";

const cx = cnBind.bind(styles);

export const Calendar = () => {
    const [dateTime, setDateTime] = useState<DateTime>(DateTime.now().startOf("day"));
    const getDays = () => {
        return [...Info.weekdays("short")];
    };
    // const asd = [
    //     "2024-08-22",
    //     "2024-08-23",
    //     "2024-08-26",
    //     "2024-08-27",
    //     "2024-08-30",
    //     "2024-08-31"
    // ]
    // const asd2 = asd.map(el => el.slice(el.length - 2, el.length))
    const trans = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const [days] = useState(getDays());

    // const date = eachDayOfInterval({ start: startOfWeek(dateTime.toISO(), {
    //          weekStartsOn: 1,
    //      }), end: endOfWeek(dateTime.toISO(), { weekStartsOn: 1 }) });
    // const arr = date.map((elem) => elem.toLocaleString().slice(0, 10));
    const onPlusHandler = (type = "week", value = 1) => {
        const payload = dateTime.plus({ [type]: value });
        setDateTime(payload);
    };
    const onMinusHandler = (type = "week", value = 1) => {
        const payload = dateTime.minus({ [type]: value });
        setDateTime(payload);
    };

    return (
        <div className={cx("calendar")}>
            <div className={cx("buttons")}>
                <SvgIcon className={cx("prev")} name="ArrowRight" onClick={() => onMinusHandler()} />
                <SvgIcon className={cx("next")} name="ArrowRight" onClick={() => onPlusHandler()} />
            </div>

            <div className={cx("content")}>
                <div className={cx("days-week")}>
                    {days.map((_, i) => (
                        <div className={cx("item")} key={i}>
                            {trans[i]}
                        </div>
                    ))}
                </div>
                {/* <div className={cx("days")}> */}
                {/*     { */}
                {/*         arr.map(day => */}
                {/*             <div className={cx("day", { active: asd2.includes(day.slice(0,2)) })} key={day}> */}
                {/*                 {day.slice(0,2)} */}
                {/*             </div> */}
                {/*         ) */}
                {/*     } */}
                {/* </div> */}
            </div>
        </div>
    );
};
