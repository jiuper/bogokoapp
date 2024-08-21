import cnBind from "classnames/bind";
import styles from "./Calendar.module.scss";
import { useState } from "react";
import { DateTime, Info } from "luxon";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
const cx = cnBind.bind(styles);
type Props = {

};
export const Calendar = (props: Props) => {
    const [dateTime, setDateTime] = useState<DateTime>(
        DateTime.now().startOf('day'),
    );
     const getDays = () => {
        return [...Info.weekdays('short')];
    }
    const trans = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const [days] = useState(getDays());
    const [initialDate] = useState(dateTime);
    const date = eachDayOfInterval({ start: startOfWeek(dateTime.toISO(), {
            weekStartsOn: 1,
        }), end: endOfWeek(dateTime.toISO(), { weekStartsOn: 1 }) });
    const arr = date.map((elem) => elem.toLocaleString().slice(0, 10));
    const onPlusHandler = (type = 'week', value = 1) => {
        const payload = dateTime.plus({ [type]: value });
        setDateTime(payload);
    };
    const onMinusHandler = (type = 'week', value = 1) => {
        const payload = dateTime.minus({ [type]: value });
        setDateTime(payload);
    };
    console.log(dateTime.toLocaleString());
    return (
        <div className={cx("calendar")}>
            <div className={cx("buttons")}>
                <SvgIcon className={cx("prev")} name={"ArrowRight"} onClick={() => onMinusHandler()}/>
                <SvgIcon className={cx("next")} name={"ArrowRight"} onClick={() => onPlusHandler()}/>
            </div>

            <div className={cx("content")}>
                <div className={cx("days-week")}>
                    {days.map((_, i) => (
                        <div
                            className={cx('item', {
                                active: i + 1 === new Date().getDay(),
                            })}
                            key={i}
                        >
                            {trans[i]}
                        </div>
                    ))}
                </div>

                
            </div>
        </div>
    );
};