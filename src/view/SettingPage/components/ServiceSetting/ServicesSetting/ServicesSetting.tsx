import { useMemo, useRef } from "react";
import cnBind from "classnames/bind";

import type { ModalSettingServiceRef } from "@/_Modals/ModalSettingService";
import { ModalSettingService } from "@/_Modals/ModalSettingService";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./ServicesSetting.module.scss";

const cx = cnBind.bind(styles);
type ServicesSettingProps = {
    id: string;
};
export const ServicesSetting = ({ id }: ServicesSettingProps) => {
    const { companyInfo } = useClientContext();
    const modalRef = useRef<ModalSettingServiceRef>(null);
    const [isOpenModalSettingService, , closeModalSettingService] = useBooleanState(false);

    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    const filterListData = useMemo(
        () => listData.filter((el) => el?.id?.toString() === id)[0].services,
        [listData, id],
    );

    const { servicesId, isOpenModalBookingService, handleOpenModalService } =
        useBookingService(filterListData);

    return (
        <div className={cx("wrapper", "container")}>
            {filterListData.map((el) => (
                <div key={el.id} className={cx("section")}>
                    <h2 className={cx("title")}>{el.name}</h2>
                    <div className={cx("list", isOpenModalBookingService && "active")}>
                        {filterListData.map((card) => (
                            <ServiceCard
                                isChoose={servicesId.includes(card.id || "")}
                                onClick={handleOpenModalService}
                                key={card.id}
                                currencyShortTitle={companyInfo?.currencyShortTitle}
                                {...card}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <ModalSettingService
                ref={modalRef}
                isOpen={isOpenModalSettingService}
                onClose={closeModalSettingService}
                onSubmit={() => {}}
                type="create"
                isLoading={false}
            />
        </div>
    );
};
