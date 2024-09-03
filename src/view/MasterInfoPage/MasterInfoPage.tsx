import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import { ModalSocialNetworks } from "@/_Modals/ModalSocialNetworks";
import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./MasterInfoPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoPageProps = {
    data?: GetMasterFullInfoDto;
    masterId?: string;
};
export const MasterInfoPage = ({ data, masterId }: MasterInfoPageProps) => {
    const href = useNavigate();
    const dispatch = useAppDispatch();
    const listData = useMemo(() => data?.services || [], [data?.services]);
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const [isOpenModalNetWork, onOpenModalNetWork, onCloseModalNetWork] = useBooleanState(false);
    const {
        servicesId,
        serviceId,
        isOpenModalBookingService,
        handleOpenModalService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalDetailsService,
    } = useBookingService();

    const onRecord = () => {
        href(`${ROUTES.TIMESBOOKING}/${masterId}`);
        dispatch(
            bookingSliceActions.setBookingMasters({
                masterInfo: {
                    ...data,
                    services: data?.services?.filter((el) => servicesId.includes(el.id)),
                },
            }),
        );
    };

    const service = useMemo(() => listData.find((service) => service.id === serviceId), [listData, serviceId]);
    const filterListData = useMemo(
        () => listData.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [listData, searchValue],
    );

    const listLink = [
        { name: "Отзывы", onClick: () => onOpenModalNetWork(), icon: "star-rate" },
        { name: "Связаться", onClick: () => onOpenModalNetWork(), icon: "message" },
    ];

    const price = filterListData
        .filter((el) => servicesId.includes(el.id || ""))
        .reduce((acc, el) => acc + +el.price, 0);
    const time = filterListData.filter((el) => servicesId.includes(el.id || "")).reduce((acc, el) => acc + +el.time, 0);

    return (
        <div className={cx("master-info")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={data?.image} />
                        <Badge className={cx("badge")} type="number">
                            {data?.rating || 3.9}
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{data?.name}</span>
                        <span className={cx("post")}>{data?.post}</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <LinkGroup listLink={listLink} />
                    <div className={cx("list-services")}>
                        <h2>Услуги</h2>
                        <InputSearch value={searchValue} onChange={setSearchValue} />
                        {filterListData.length !== 0 ? (
                            <div className={cx("list", isOpenModalBookingService && "active")}>
                                {filterListData.map((card) => (
                                    <ServiceCard
                                        isChoose={servicesId.includes(card.id || "")}
                                        onClick={handleOpenModalService}
                                        key={card.id}
                                        {...card}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={cx("not-found")}>Такой услуги нет</div>
                        )}
                    </div>
                </div>
            </div>
            <ModalSocialNetworks listHrefNetworks={[]} isOpen={isOpenModalNetWork} onClose={onCloseModalNetWork} />
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
                label="К дате и времени"
            />
        </div>
    );
};
