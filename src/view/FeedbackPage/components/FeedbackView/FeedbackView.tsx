import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import type { FeedbackCardProps } from "@/view/FeedbackPage/components/FeedbackView/components/FeedbackCard";
import { FeedbackCard } from "@/view/FeedbackPage/components/FeedbackView/components/FeedbackCard";

import styles from "./FeedbackView.module.scss";

const cx = cnBind.bind(styles);
type FeedbackViewProps = {};
export const FeedbackView = ({}: FeedbackViewProps) => {
    const list: FeedbackCardProps[] = [
        {
            name: "Алёна",
            service: "Маникюр без покрытия",
            id: "1",
            rating: 4.5,
            dateTime: "2022-12-12 12:12",
            description: "Очень хороший мастер. Все очень понравилось. Приходит вовремя. Спасибо",
        },
    ];

    const countRating = 339;
    const countFeedback = 190;

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("header")}>
                <h2 className={cx("title")}>Отзывы</h2>
                <div className={cx("rating-counter")}>
                    <div className={cx("rating")}>
                        <SvgIcon className={cx("icon")} name="rating" />
                        <span>{4.5}</span>
                    </div>
                    <div className={cx("counter")}>
                        <span>{countRating} оценок</span>
                        <span>{countFeedback} отзывов</span>
                    </div>
                </div>
            </div>

            <div className={cx("list")}>
                {list.map((el) => (
                    <FeedbackCard key={el.id} {...el} />
                ))}
            </div>
        </div>
    );
};
