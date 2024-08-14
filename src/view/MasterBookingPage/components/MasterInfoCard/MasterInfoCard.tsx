import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./MasterInfoCard.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoCard = {
    id?: string;
    image?: string;
    name?: string;
    post?: string;
};
export const MasterInfoCard = ({ post, name, image }: MasterInfoCard) => {
    return (
        <div className={cx("card")}>
            <img className={cx("avatar")} src={image} alt="avatar" />
            <div className={cx("info")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{post}</span>
            </div>
            <SvgIcon name="ArrowDown" className={cx("arrow")} />
        </div>
    );
};
