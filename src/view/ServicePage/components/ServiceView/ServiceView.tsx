import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { ServiceCard } from "@/view/ServicePage/components/ServiceView/components/ServiceCard";

import styles from "./ServiceView.module.scss";

const cx = cnBind.bind(styles);
export type ServiceViewProps = {
    data: GetCategoryWithServiceDto[];
    companyInfo?: GetCompanyDto | null;
};
export const ServiceView = ({ data, companyInfo }: ServiceViewProps) => {
    const href = useNavigate();

    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterSearchListData = useMemo(
        () =>
            data.length !== 0
                ? data[0].services.filter((el) =>
                      el.name?.toLowerCase().includes(searchValue?.toLowerCase() || ""),
                  )
                : [],
        [data, searchValue],
    );

    const {
        servicesId,
        price,
        time,
        service,
        isOpenModalBookingService,
        handleOpenModalService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalDetailsService,
    } = useBookingService(filterSearchListData);

    const onRecord = () => href(`${ROUTES.MASTERFILTER}`);

    return (
        <div className={cx("wrapper", "container")}>
            {data.map((el) => (
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
                                    currencyShortTitle={companyInfo?.currencyShortTitle}
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
                currencyShortTitle={companyInfo?.currencyShortTitle}
            />
            <ModalBookingService
                price={price}
                time={time}
                count={servicesId.length}
                isOpen={isOpenModalBookingService}
                onClick={onRecord}
                title="Услуги можно заказать находясь внутри категории"
                currencyShortTitle={companyInfo?.currencyShortTitle}
                label="К выбору мастера"
            />
        </div>
    );
};
