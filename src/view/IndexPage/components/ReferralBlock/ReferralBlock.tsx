import cnBind from "classnames/bind";

import styles from "./ReferralBlock.module.scss";
import { Button } from "@telegram-apps/telegram-ui";
const cx = cnBind.bind(styles);
type ReferralBlockProps = {
    countCredits?: number;

};
export const ReferralBlock = ({countCredits = 10}: ReferralBlockProps) => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("referral-block")}>
                <span className={cx("referral-title")}>Ваш баланс</span>
                <span className={cx("referral-value")}>{`${countCredits} р`}</span>
            </div>
            <Button className={cx("referral-button")}>Заработать бонусы</Button>
        </div>
    );
};