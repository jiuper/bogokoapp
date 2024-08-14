import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ServiceInfoCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceInfoCardProps = {
    id?: string;
    name?: string;
    post?: string;
};
export const ServiceInfoCard = ({ post, name }: ServiceInfoCardProps) => {
    return (
        <div className={cx("card")}>
            <div className={cx("info")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{post}</span>
            </div>
            <SvgIcon name="ArrowDown" className={cx("arrow")} />
        </div>
    );
};
