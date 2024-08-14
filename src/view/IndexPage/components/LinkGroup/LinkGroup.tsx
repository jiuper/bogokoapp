import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./LinkGroup.module.scss";

const cx = cnBind.bind(styles);
export const LinkGroup = () => {
    const listLink = [
        { name: "Выбрать услугу", href: ROUTES.SERVICES, icon: "notebook" },
        { name: "Выбрать мастера", href: ROUTES.BOOKING, icon: "add-master" },
    ];

    return (
        <div className={cx("links")}>
            {listLink.map((item) => (
                <Link className={cx("link")} to={item.href}>
                    <div className={cx("link-container")}>
                        <SvgIcon name={item.icon} />
                        <span>{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
