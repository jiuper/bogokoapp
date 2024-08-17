import cnBind from "classnames/bind";

import type { ServiceDateTimes } from "@/entities/masters/types.ts";
import exm from "@/shared/assets/icon/Address-icon.svg";
import { ButtonIconArrow } from "@/shared/ui/ButtonIcon";

import styles from "./DetailedCard.module.scss";

const cx = cnBind.bind(styles);
type DetailedCardProps = {
    title: string;
    listItem: ServiceDateTimes[];
    onClick?: (id?: string) => void;
};
export const DetailedCard = ({ listItem, title, onClick }: DetailedCardProps) => {
    const onClickHandler = (id?: string) => {
        onClick?.(id);
    };

    return (
        <div className={cx("card-detailed")}>
            <h2 className={cx("title")}>{title}</h2>
            <div className={cx("list")}>
                {listItem.map((el, i) => (
                    <ButtonIconArrow
                        onClick={() => onClickHandler(el.id)}
                        icon={el.image || exm}
                        key={i}
                        label={el.name}
                    />
                ))}
            </div>
        </div>
    );
};
