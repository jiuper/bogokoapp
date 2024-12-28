import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import cnBind from "classnames/bind";

import type { ModalSettingServiceRef } from "@/_Modals/ModalSettingService";
import { ModalSettingService } from "@/_Modals/ModalSettingService";
import { ButtonsAction } from "@/components/ButtonsAction";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks";

import { ServiceCard } from "../../../../ServicePage/components/ServiceView/components/ServiceCard";

import styles from "./ServicesSetting.module.scss";

const cx = cnBind.bind(styles);
type ServicesSettingProps = {};

export const ServicesSetting = ({}: ServicesSettingProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useAllServicesQuery();
    const { companyInfo } = useClientContext();
    const modalRef = useRef<ModalSettingServiceRef>(null);

    const listData = useMemo(() => data || [], [data]);
    const categoryData = useMemo(() => {
        return id ? listData.find((el) => el?.id?.toString() === id) : null;
    }, [listData, id]);

    const servicesData = categoryData?.services || [];

    const [isOpenModalSettingService, openCreateModal, closeModalSettingService] =
        useBooleanState(false);
    const [createModalType, setCreateModalType] = useState<"create" | "edit">("create");

    const handleCreateModal = () => {
        openCreateModal();
        setCreateModalType("create");
        modalRef.current?.setFormValues({ id });
    };

    const handleEditModal = (serviceId?: string) => {
        const payload = servicesData.find((el) => el.id === serviceId);

        if (!payload) return;

        openCreateModal();
        setCreateModalType("edit");
        modalRef.current?.setFormValues({
            price: payload?.priceMin?.toString() || "",
            description: "",
            caption: payload?.name || "",
            time: payload?.time?.toString() || "",
            id: payload?.id || "",
            serviceId: serviceId || "",
        });
    };

    const handleCloseCreateModal = () => {
        closeModalSettingService();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };

    const handleCloseToBack = () => {
        closeModalSettingService();
        setCreateModalType("create");
        modalRef.current?.clearValues();
        navigate(`${ROUTES.SETTING}/services`);
    };

    if (!categoryData || servicesData.length === 0) {
        return <div>No services found for this category</div>;
    }

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("section")}>
                <h2 className={cx("title")}>{categoryData.name}</h2>
                <div className={cx("list", isOpenModalSettingService && "active")}>
                    {servicesData.map((card) => (
                        <ServiceCard
                            isChoose={false}
                            onClick={() => handleEditModal(card.id)}
                            key={card.id}
                            currencyShortTitle={companyInfo?.currencyShortTitle}
                            {...card}
                        />
                    ))}
                </div>
            </div>
            <ModalSettingService
                ref={modalRef}
                isOpen={isOpenModalSettingService}
                onClose={handleCloseCreateModal}
                onSubmit={() => {}}
                type={createModalType}
                isLoading={false}
            />
            <ButtonsAction
                isOpen={!isOpenModalSettingService}
                onSubmit={handleCreateModal}
                onClose={handleCloseToBack}
                btnLabel={["Добавить услугу", "Назад к категориям"]}
            />
        </div>
    );
};
