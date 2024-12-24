import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import avatar from "@/shared/assets/icon/Avatar.svg";
import { ROUTES } from "@/shared/const/Routes.ts";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";

import styles from "./MasterView.module.scss";

const cx = cnBind.bind(styles);

export const MasterView = () => {
    const href = useNavigate();
    const listLink = [
        { name: "Клиенты", onClick: () => href(ROUTES.BOOKING), icon: "notebook" },
        {
            name: "Настройки",
            onClick: () => href(`${ROUTES.SETTING}/personalDetail/${1}`),
            icon: "star-rate",
        },
        { name: "Биометрия", onClick: () => href(ROUTES.FEEDBACK), icon: "image" },
        { name: "Прогресс", onClick: () => href(ROUTES.FEEDBACK), icon: "image" },
    ];
    const list = ["Силовая показатели", "Выносливость", "Рельефное тело", "Кардио тренировки"];

    return (
        <div className={cx("master-profile")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={avatar} />
                        <Badge className={cx("badge")} type="number">
                            3.9
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>listGymDataFilter?.name</span>
                        <span className={cx("post")}>listGymDataFilter?.gym?.name</span>
                        <span className={cx("post")}>listGymDataFilter?.gym?.address</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("list-services")}>
                        <span className={cx("title")}>Моя специализация</span>
                        <div className={cx("list-serv")}>
                            {list.map((el, i) => (
                                <div key={i} className={cx("title")}>
                                    {el}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx("list")}>
                        <div className={cx("links")}>
                            <LinkGroup listLink={[listLink[0]]} />
                        </div>
                        <div className={cx("links")}>
                            <LinkGroup listLink={[listLink[1]]} />
                        </div>
                        <div className={cx("links")}>
                            <LinkGroup listLink={[listLink[2]]} />
                        </div>
                        <div className={cx("links")}>
                            <LinkGroup listLink={[listLink[3]]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
