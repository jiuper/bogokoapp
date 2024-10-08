import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import { ModalSocialNetworks } from "@/_Modals/ModalSocialNetworks";
import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./MasterInfoPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoPageProps = {
    data: GetMasterFullInfoDto;
    masterId?: string;
};
export const MasterInfoPage = ({ data, masterId }: MasterInfoPageProps) => {
    const { companyInfo } = useClientContext();
    const { handleAddMasterBooking } = useClientContextMutate();
    const href = useNavigate();

    const listData = useMemo(() => data?.services || [], [data?.services]);
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const [isOpenModalNetWork, onOpenModalNetWork, onCloseModalNetWork] = useBooleanState(false);

    const filterListData = useMemo(
        () => listData.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [listData, searchValue],
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
    } = useBookingService(filterListData);

    const onRecord = () => {
        handleAddMasterBooking(masterId || "");
        href(`${ROUTES.TIMESBOOKING}/${masterId}`);
    };

    const listLinkTop = [
        { name: "Отзывы", onClick: () => href(ROUTES.FEEDBACK), icon: "star-rate" },
        { name: "Связаться", onClick: () => onOpenModalNetWork(), icon: "message" },
    ];
    const listLinkBottom = [{ name: "Выполненные работы", onClick: () => onOpenModalNetWork(), icon: "image" }];

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
                    <div className={cx("links")}>
                        <LinkGroup listLink={listLinkTop} />
                        <LinkGroup listLink={listLinkBottom} />
                    </div>

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
                                        currencyShortTitle={companyInfo?.currencyShortTitle}
                                        {...card}
                                        priceMax={card.priceMax}
                                        priceMin={card.priceMax}
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
                currencyShortTitle={companyInfo?.currencyShortTitle}
                onClick={handleOpenModalDetailsService}
                onClose={onCloseModalService}
            />
            <ModalBookingService
                price={price}
                time={time}
                count={servicesId.length}
                isOpen={isOpenModalBookingService}
                currencyShortTitle={companyInfo?.currencyShortTitle}
                onClick={onRecord}
                title="Услуги можно заказать находясь внутри категории"
                label="К дате и времени"
            />
        </div>
    );
};
