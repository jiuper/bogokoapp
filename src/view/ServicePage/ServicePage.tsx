import { useMemo, useState } from "react";
import cnBind from "classnames/bind";

import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi/getAllServicesApi.ts";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./ServicePage.module.scss";

const cx = cnBind.bind(styles);
type ServicePageProps = {
    id: string;
};
export const ServicePage = ({ id }: ServicePageProps) => {
    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);
    const filterListData = useMemo(() => listData.filter((el) => el.id === id), [listData, id]);
    const [isOpenModalService, onOpenModalService, onCloseModalService] = useBooleanState(false);
    const [serviceId, setServiceId] = useState<string>("");
    const handleOpenModalService = (id?: string) => {
        if (id) setServiceId(id);
        onOpenModalService();
    };
    const service = useMemo(
        () => filterListData[0].services.find((elem) => elem.id === serviceId),
        [filterListData, serviceId],
    );

    return (
        <div className={cx("wrapper", "container")}>
            {filterListData.map((el) => (
                <div key={el.id}>
                    <h2 className={cx("title")}>{el.name}</h2>
                    <div className={cx("list")}>
                        {el.services.map((card) => (
                            <ServiceCard onClick={handleOpenModalService} key={card.id} {...card} />
                        ))}
                    </div>
                </div>
            ))}
            <ModalDetailedService {...service} isOpen={isOpenModalService} onClose={onCloseModalService} />
        </div>
    );
};
