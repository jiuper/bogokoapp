import cnBind from "classnames/bind";

import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ChooseView.module.scss";

const cx = cnBind.bind(styles);
export type ChooseViewProps = {
    listLink: { title: string; desc: string; src: string; href: string }[];
    title?: string;
};
export const ChooseView = ({ listLink, title = "Записаться" }: ChooseViewProps) => {
    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>{title}</h2>
            <div className={cx("list")}>
                {listLink.map(({ title, desc, src, href }, i) => (
                    <Link key={i} to={href} onClick={() => {}} className={cx("card")}>
                        <img className={cx("avatar")} src={src} alt="img" />
                        <div className={cx("info")}>
                            <span className={cx("name")}>{title}</span>
                            <span className={cx("post")}>{desc}</span>
                        </div>
                        <SvgIcon name="ArrowRight" className={cx("arrow")} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
