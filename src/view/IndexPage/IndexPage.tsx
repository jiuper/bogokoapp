import type { FC } from "react";
import { List, Section } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { Link } from "@/components/Link/Link.tsx";

import styles from "./IndexPage.module.scss";

const cx = cnBind.bind(styles);
export const IndexPage: FC = () => {
    return (
        <List>
            <Section header="Запись онлайн салона БОГОКО" footer="Сервис TEZAM">
                <div className={cx("wrapper", "container")}>
                    <h1 className={cx("title")}>С чего начать?</h1>
                    <div className={cx("links")}>
                        <Link className={cx("link")} to="/services">
                            Выбрать услугу
                        </Link>
                        <Link className={cx("link")} to="/booking">
                            Выбрать мастера
                        </Link>
                    </div>
                </div>
            </Section>
        </List>
    );
};
