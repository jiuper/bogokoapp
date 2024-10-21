import cnBind from "classnames/bind";

import styles from "./DayPicker.module.scss";

const cx = cnBind.bind(styles);
type DayPickerProps = {
    onChange?: (date: Date) => void;
    value?: Date;
};
export const DayPicker = ({}: DayPickerProps) => {
    return (
        <div className={cx("day-picker")}>
            {/* <div className={cx("calendar")}> */}
            {/*     <div className={cx("header")}> */}
            {/*         <span className={cx("title")}> */}
            {/*             {dateTime.setLocale("ru").toFormat("LLLL yyyy")} */}
            {/*         </span> */}
            {/*         /!* <div className={cx("buttons")}> *!/ */}
            {/*         /!*     <SvgIcon *!/ */}
            {/*         /!*         className={cx("prev")} *!/ */}
            {/*         /!*         name="ArrowRight" *!/ */}
            {/*         /!*         onClick={() => onMinusHandler()} *!/ */}
            {/*         /!*     /> *!/ */}
            {/*         /!*     <SvgIcon *!/ */}
            {/*         /!*         className={cx("next")} *!/ */}
            {/*         /!*         name="ArrowRight" *!/ */}
            {/*         /!*         onClick={() => onPlusHandler()} *!/ */}
            {/*         /!*     /> *!/ */}
            {/*         /!* </div> *!/ */}
            {/*     </div> */}

            {/*     <SwipeableWrapper */}
            {/*         onSwipedLeft={() => onPlusHandler()} */}
            {/*         onSwipedRight={() => onMinusHandler()} */}
            {/*         className={cx("content")} */}
            {/*     > */}
            {/*         {date.map((day, index) => { */}
            {/*             const initDay = day.toLocaleDateString(); */}
            {/*             const today = new Date().toLocaleDateString(); */}
            {/*             const numberDay = new Date(day).getDate(); */}
            {/*             const selectedDay = initDay === selectedDate?.toLocaleDateString(); */}

            {/*             return ( */}
            {/*                 <div className={cx("days")} key={initDay}> */}
            {/*                     {days.map((_, i) => { */}
            {/*                         if (i !== index) return null; */}

            {/*                         const isWeekend = */}
            {/*                             new Date(day).getDay() === 0 || */}
            {/*                             new Date(day).getDay() === 6; */}
            {/*                         const isWorkDay = formatListDate.includes(initDay); */}
            {/*                         const isToday = initDay === today; */}

            {/*                         return ( */}
            {/*                             <div */}
            {/*                                 key={initDay} */}
            {/*                                 className={cx("day", { */}
            {/*                                     work: isWorkDay, */}
            {/*                                     notWork: !isWorkDay, */}
            {/*                                     today: isToday, */}
            {/*                                     weekend: isWeekend, */}
            {/*                                     selectedDay, */}
            {/*                                 })} */}
            {/*                                 onClick={() => onSelectHandler(day)} */}
            {/*                             > */}
            {/*                                 <span className={cx("day-week")}>{trans[i]}</span> */}
            {/*                                 <span className={cx("day-number")}>{numberDay}</span> */}
            {/*                             </div> */}
            {/*                         ); */}
            {/*                     })} */}
            {/*                 </div> */}
            {/*             ); */}
            {/*         })} */}
            {/*     </SwipeableWrapper> */}
            {/* </div> */}
        </div>
    );
};
