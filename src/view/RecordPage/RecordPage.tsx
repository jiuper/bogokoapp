import { useNavigate } from "react-router";
import { useMainButton } from "@telegram-apps/sdk-react";
import cnBind from "classnames/bind";

import notFound from "@/shared/assets/icon/Avatar.svg";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";

import styles from "./RecordPage.module.scss";

const cx = cnBind.bind(styles);
export const RecordPage = () => {
    const listLink = [
        { name: "Перенести", href: ROUTES.SERVICES, icon: "notebook" },
        { name: "Отменить", icon: "add-master", href: ROUTES.SERVICES },
        { name: "Еще запись", icon: "add-master", href: ROUTES.SERVICES },
        { name: "Календарь", icon: "add-master", href: ROUTES.SERVICES },
    ];
    const mb = useMainButton();
    const href = useNavigate();
    mb.show();
    mb.setParams({
        text: "На главную",
        bgColor: "#FF7648",
        textColor: "#fff",
        isEnabled: true,
        isVisible: true,
    });
    mb.on("click", () => {
        href(ROUTES.MAIN);
        mb.hide();
        mb.setParams({
            isEnabled: false,
            isVisible: false,
        });
    });

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Ваша запись</span>
            </div>
            <div className={cx("cards")}>
                <AddressCompany
                    dateTime={{ date: "24 августа, суббота", time: "13:00-15:00" }}
                    city="Витебск, Чкалова, 11к1"
                    map=""
                />
                <div className={cx("list")}>
                    <CardOrder
                        icon="ArrowRight"
                        rating={4.1}
                        avatar={notFound}
                        name="Иван Иванов"
                        post="Мастер"
                        onClick={() => href(`${ROUTES.MASTER}/${1}`)}
                    />
                    <CardOrder avatar={notFound} name="Мастер" post="40 мин" price="60" />
                    <CardOrder avatar={notFound} name="Мастер" post="40 мин" price="60" />
                </div>
                <Link to={ROUTES.PROFILE} className={cx("card")}>
                    <span>Сергей</span>
                    <div className={cx("phone")}>
                        <span>+375 29 777 77 77</span>
                        <SvgIcon name="ArrowRight" className={cx("arrow")} />
                    </div>
                </Link>
                <LinkGroup listLink={listLink} />
            </div>
        </div>
    );
};
