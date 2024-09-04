import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi/getAllServicesApi.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./ServicePage.module.scss";

const cx = cnBind.bind(styles);
type ServicePageProps = {
    id: string;
};
export const ServicePage = ({ id }: ServicePageProps) => {
    const href = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);
    const filterListData = useMemo(() => listData.filter((el) => el.id === id), [listData, id]);
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const {
        servicesId,
        serviceId,
        isOpenModalBookingService,
        handleOpenModalService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalDetailsService,
    } = useBookingService();

    const filterSearchListData = useMemo(
        () =>
            filterListData.length !== 0
                ? filterListData[0].services.filter((el) =>
                      el.name?.toLowerCase().includes(searchValue?.toLowerCase() || ""),
                  )
                : [],
        [filterListData, searchValue],
    );

    const service = useMemo(
        () => filterSearchListData.find((elem) => elem.id === serviceId),
        [filterSearchListData, serviceId],
    );

    const price = filterSearchListData
        .filter((el) => servicesId.includes(el.id || ""))
        .reduce((acc, el) => (el.price ? acc + +el.price : 0), 0);
    const time = filterSearchListData
        .filter((el) => servicesId.includes(el.id || ""))
        .reduce((acc, el) => (el.time ? acc + +el.time : 0), 0);

    const onRecord = () => {
        href(`${ROUTES.MASTERFILTER}`);
        dispatch(
            bookingSliceActions.setBookingMasters({
                masterInfo: {
                    services: filterSearchListData.filter((el) => servicesId.includes(el.id || "")),
                },
            }),
        );
    };

    return (
        <div className={cx("wrapper", "container")}>
            {filterListData.map((el) => (
                <div key={el.id} className={cx("section")}>
                    <h2 className={cx("title")}>{el.name}</h2>
                    <InputSearch value={searchValue} onChange={setSearchValue} />
                    <div className={cx("list", isOpenModalBookingService && "active")}>
                        {filterSearchListData.length !== 0 ? (
                            filterSearchListData.map((card) => (
                                <ServiceCard
                                    isChoose={servicesId.includes(card.id || "")}
                                    onClick={handleOpenModalService}
                                    key={card.id}
                                    {...card}
                                />
                            ))
                        ) : (
                            <div className={cx("not-found")}>Такой услуги нет</div>
                        )}
                    </div>
                </div>
            ))}
            <ModalDetailedService
                {...service}
                isOpen={isOpenModalService}
                onClick={handleOpenModalDetailsService}
                onClose={onCloseModalService}
            />
            <ModalBookingService
                price={price}
                time={time}
                count={servicesId.length}
                isOpen={isOpenModalBookingService}
                onClick={onRecord}
                title="Услуги можно заказать находясь внутри категории"
                label="К выбору мастера"
            />
        </div>
    );
};
