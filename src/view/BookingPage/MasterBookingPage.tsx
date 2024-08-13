import { useMemo } from "react";
import { initBackButton } from "@telegram-apps/sdk-react";
import { Avatar, List, Section } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi/getAllMastersApi.ts";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
export const MasterBookingPage = () => {
    const [backButton] = initBackButton();
    const { data, isPending } = useAllMastersQuery();
    const listData = useMemo(() => data || [], [data]);

    return (
        <List>
            <Section header="Страница бронирования мастеров" footer="Тестовое приложение которое будем делать">
                <p>{backButton.isVisible}</p>

                {!isPending ? (
                    listData.map((el) => (
                        <div className={cx("wrapper", "container")} style={{}} key={el.id}>
                            <div className={cx("card-info")}>
                                <Avatar src={el.image} />
                                <div className={cx("info")}>
                                    <span>{el.name}</span>
                                    <span>{el.post}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </Section>
        </List>
    );
};
