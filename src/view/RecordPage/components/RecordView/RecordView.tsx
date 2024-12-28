import type { JSX } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import dayjs from "dayjs";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import { useRemoveRecord } from "@/entities/record/api/removeRecord/removeRecordApi.ts";
import type { ResponseNewRecordDto } from "@/entities/record/types.ts";
import notFound from "@/shared/assets/images/Empty-image-icon.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Button } from "@/shared/ui/_Button";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { CardOrder } from "@/view/OrderPage/components/OrderView/components/CardOrder";

import "dayjs/locale/ru";

import styles from "./RecordView.module.scss";

const cx = cnBind.bind(styles);
type RecordViewProps = {
    companyInfo: GetCompanyDto | null;
    data?: ResponseNewRecordDto | null;
};
export const dateFormat = (time: string, duration: number): JSX.Element => {
    const start = dayjs(time).locale("ru");
    const end = dayjs(time).add(duration, "minutes").locale("ru");

    return (
        <>
            <span className={cx("date")}>{start.format("DD MMMM, dddd")}</span>
            <span
                className={cx("time")}
            >{`${start.format("HH:mm")} - ${end.format("HH:mm")}`}</span>
        </>
    );
};
export const RecordView = ({ companyInfo, data }: RecordViewProps) => {
    const href = useNavigate();
    const { mutate: removeRecord } = useRemoveRecord();
    const listLink = [
        { name: "Перенести", href: ROUTES.TIMESBOOKING, icon: "more_time" },
        {
            name: "Отменить",
            icon: "highlight_off",
            href: ROUTES.MAIN,
            onClick: () => removeRecord(data?.recordId || ""),
        },
        { name: "Еще запись", icon: "add-record", href: ROUTES.BOOKING },
        { name: "Календарь", icon: "Calendar", href: ROUTES.CALENDAR },
    ];

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Ваша запись</span>
            </div>
            <div className={cx("cards")}>
                <AddressCompany
                    city={companyInfo?.city}
                    address={companyInfo?.address}
                    map={{
                        lat: companyInfo?.coordinateLat,
                        lon: companyInfo?.coordinateLon,
                    }}
                    dateTime={dateFormat(data?.datetime || "", 30)}
                />
                <div className={cx("list")}>
                    <CardOrder
                        icon="ArrowRight"
                        rating={data?.master?.rating}
                        avatar={data?.master?.image || notFound}
                        name={data?.master?.name}
                        post={data?.master?.post}
                        onClick={() => href(`${ROUTES.MASTER}/${data?.master?.id}`)}
                    />
                    {data?.master?.services?.length
                        ? data?.master?.services?.map((el) => (
                              <div key={el.id}>
                                  <CardOrder
                                      avatar={el.image || notFound}
                                      name={el.name}
                                      post={`${el.time} мин`}
                                      price={`${el.priceMax} ${companyInfo?.currencyShortTitle}`}
                                  />
                              </div>
                          ))
                        : null}
                </div>
                <div className={cx("card")}>
                    <span>{data?.clientName}</span>
                    <div className={cx("phone")}>
                        <span>{`+${data?.clientPhone}`}</span>
                    </div>
                </div>
                <LinkGroup listLink={listLink} />
            </div>
            <div className={cx("main")}>
                <Button label="Главная" className={cx("btn")} onClick={() => href(ROUTES.MAIN)} />
            </div>
        </div>
    );
};
