import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/_Button";

import styles from "./FriendsBonus.module.scss";

const cx = cnBind.bind(styles);
type FriendsBonusProps = {
    onBack?: () => void;
};
export const FriendsBonus = ({ onBack }: FriendsBonusProps = {}) => {
    return (
        <div className={cx("friends-bonus")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("list")}>
                    <span className={cx("caption")}>Приглашайте друзей и получайте бонусы</span>
                    <span className={cx("text")}>
                        Делитесь ссылкой на салон BOGOKO в Telegram и других социальных сетях со
                        своими друзьями и наслаждайтесь дополнительными бонусами на вашем балансе!
                    </span>
                </div>
                <Button onClick={onBack} variant="outlined" label="К системе бонусов" />
            </div>
        </div>
    );
};
