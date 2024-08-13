import { useMemo, useState } from "react";
import { initBackButton } from "@telegram-apps/sdk-react";
import { Accordion, List, Section } from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import cnBind from "classnames/bind";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi/getAllServicesApi.ts";

import styles from "./ServicesBookingPage.module.scss";

const cx = cnBind.bind(styles);

export const ServicesBookingPage = () => {
    const [backButton] = initBackButton();
    const { data, isPending } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);
    const handleClick = (num: number | null) => {
        setExpanded(num);
        setOpen(!open);
    };

    return (
        <List>
            <Section header="Страница бронирования услуг" footer="Тестовое приложение которое будем делать">
                <p>{backButton.isVisible}</p>
                <div className={cx("wrapper", "container")}>
                    {!isPending ? (
                        listData.map((el, i) => (
                            <Accordion
                                key={el.id}
                                onChange={() => handleClick(i)}
                                expanded={i === expanded ? open : false}
                            >
                                <AccordionSummary>{el.name}</AccordionSummary>
                                {el.services.map((service) => (
                                    <AccordionContent key={service.id}>
                                        <div className={cx("card")}>
                                            <span>Название услуги:{service.name}</span>
                                            <span>Время работы: {service.time}</span>
                                            <span>Стоимость:{service.price}</span>
                                        </div>
                                    </AccordionContent>
                                ))}
                            </Accordion>
                        ))
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </Section>
        </List>
    );
};
