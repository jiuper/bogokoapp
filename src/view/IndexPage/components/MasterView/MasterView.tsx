import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import def from "@/shared/assets/images/Empty-image-icon.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";

import styles from "./MasterView.module.scss";

const cx = cnBind.bind(styles);
type MasterViewProps = {
    data?: GetMasterFullInfoDto;
};
export const MasterView = ({ data }: MasterViewProps) => {
    const href = useNavigate();
    const listLink = [
        { name: "Мои услуги", onClick: () => href(ROUTES.SERVICE), icon: "notebook" },
        { name: "Отзывы", onClick: () => href(ROUTES.FEEDBACK), icon: "star-rate" },
        { name: "Фото работ", onClick: () => href(ROUTES.FEEDBACK), icon: "image" },
    ];

    return (
        <div className={cx("bg-wrapper")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={data?.image || def} />
                        <Badge className={cx("badge")} type="number">
                            {data?.rating || 3.9}
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{data?.name}</span>
                        <span className={cx("post")}>{data?.post}</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("links")}>
                        <LinkGroup listLink={listLink} />
                    </div>
                </div>
                <div>
                    <Link to={ROUTES.BONUS} className={cx("button")}>
                        Получить бонусы
                    </Link>
                </div>
            </div>
        </div>
    );
};
