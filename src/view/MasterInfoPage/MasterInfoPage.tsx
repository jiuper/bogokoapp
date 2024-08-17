import { useMemo, useState } from "react";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import { ModalSocialNetworks } from "@/_Modals/ModalSocialNetworks";
import { useMasterQuery } from "@/entities/masters/api/getMasterApi";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";
import { Button } from "@/shared/ui/_Button";
import { DetailedCard } from "@/view/MasterInfoPage/components/DetailedCard";

import styles from "./MasterInfoPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoPageProps = {
    masterId?: string;
    companyId: string;
};
export const MasterInfoPage = ({ masterId, companyId }: MasterInfoPageProps) => {
    const { data } = useMasterQuery({ masterId, companyId });
    const listDataConnect = [
        { name: "Отзывы", image: "" },
        { name: "Рейтинг", image: "" },
        { name: "Социальные сети", image: "" },
    ];

    const [isOpenModalNetWork, onOpenModalNetWork, onCloseModalNetWork] = useBooleanState(false);
    const [isOpenModalService, onOpenModalService, onCloseModalService] = useBooleanState(false);
    const [serviceId, setServiceId] = useState<string>("");
    const handleOpenModalService = (id?: string) => {
        if (id) setServiceId(id);
        onOpenModalService();
    };
    const service = useMemo(
        () => data?.services?.find((service) => service.id === serviceId),
        [data?.services, serviceId],
    );

    return (
        <div className={cx("master-info")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <Avatar src={data?.image} />
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{data?.name}</span>
                        <span className={cx("post")}>{data?.post}</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("description")}>
                        <h2 className={cx("title")}>Описание</h2>
                        <div className={cx("text")}>
                            Тут будет огромное описание мастераТут будет огромное описание мастераТут будет огромное
                            описание мастераТут будет огромное описание мастераТут будет огромное описание мастераТут
                            будет огромное описание мастераТут будет огромное описание мастераТут будет огромное
                            описание мастера
                        </div>
                    </div>
                    <DetailedCard
                        onClick={onOpenModalNetWork}
                        listItem={listDataConnect}
                        title="Информация о мастере"
                    />
                    <DetailedCard listItem={data?.services || []} title="Услуги" onClick={handleOpenModalService} />
                    <Button className={cx("button")} label="Записаться" onClick={() => {}} />
                </div>
            </div>
            <ModalSocialNetworks listHrefNetworks={[]} isOpen={isOpenModalNetWork} onClose={onCloseModalNetWork} />
            <ModalDetailedService {...service} isOpen={isOpenModalService} onClose={onCloseModalService} />
        </div>
    );
};
