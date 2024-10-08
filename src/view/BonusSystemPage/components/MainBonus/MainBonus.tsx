import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/_Button";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./MainBonus.module.scss";

const cx = cnBind.bind(styles);
type MainBonusProps = {
    handleTab?: (num: number) => void;
};
export const MainBonus = ({ handleTab }: MainBonusProps) => {
    const listBtn = [
        "Бонус за подписку",
        "Получайте бонусы с дисконтной картой",
        "Приглашайте друзей и получайте бонусы",
    ];

    return (
        <div className={cx("main-bonus")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("list")}>
                    {listBtn.map((el, i) => (
                        <div onClick={() => handleTab?.(i + 1)} className={cx("item")} key={el}>
                            <span className={cx("text")}>{el}</span>
                            <SvgIcon name="ArrowRight" />
                        </div>
                    ))}
                </div>
                <Button variant="outlined" label="Ввести промокод" />
            </div>
        </div>
    );
};
