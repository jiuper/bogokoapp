import { Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";

import styles from "./CardStaff.module.scss";

const cx = cnBind.bind(styles);
type CardOrderProps = {
    persona: GetMasterFullInfoDto;
    onClick?: () => void;
};
export const CardStaff = ({ onClick, persona }: CardOrderProps) => {
    const { name, image, post } = persona;

    return (
        <div className={cx("wrapper")} onClick={onClick}>
            <div className={cx("avatar-container")}>
                <Image
                    width="96px"
                    height="96px"
                    className={cx("avatar")}
                    src={image}
                    alt="avatar"
                />
                <Badge className={cx("badge")} type="number">
                    4.9
                </Badge>
            </div>
            <div className={cx("body")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{post}</span>
            </div>
        </div>
    );
};
