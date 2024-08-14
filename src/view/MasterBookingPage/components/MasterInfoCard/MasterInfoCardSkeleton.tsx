import cnBind from "classnames/bind";

import styles from "./MasterInfoCard.module.scss";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { Skeleton } from "primereact/skeleton";

const cx = cnBind.bind(styles);

export const MasterInfoCardSkeleton = () => {
    return (
        <div className={cx("card")}>
            <Skeleton shape="circle" size="2rem" className="mr-2"></Skeleton>
            <div className={cx("info")}>
                <Skeleton width="10rem" height="4rem"></Skeleton>
            </div>
            <SvgIcon name={"ArrowDown"} className={cx("arrow")}/>
        </div>
    );
};
