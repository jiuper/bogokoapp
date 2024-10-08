import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { FixedLayout, Spinner, Tabbar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalAddRecordMaster } from "@/_Modals/ModalAddRecordMaster";
import { useInfoCompanyQuery } from "@/entities/company/api/getInfoCompanyApi";
import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { useMasterQuery } from "@/entities/masters/api/getMasterApi";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { permissionsPage } from "@/shared/const/routing.ts";
import { useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks";
import { useNavigationItems } from "@/shared/hooks/useNavigationItems.ts";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const href = useNavigate();

    const { data } = useInfoCompanyQuery();
    const { data: listMaster } = useAllMastersQuery(true);
    const { data: listService } = useAllServicesQuery();

    const listMasterData = useMemo(() => listMaster || [], [listMaster]);
    const listMasterFullInfo = useMasterQuery(listMasterData.map((el) => el.id));
    const tabs = useNavigationItems();
    const location = useLocation().pathname;
    const { handleSetCompanyInfo, handleSetListMaster, handleResetBooking } =
        useClientContextMutate();

    const [isModalOpen, onOpen, onClose] = useBooleanState(false);

    useEffect(() => {
        if (data) handleSetCompanyInfo(data);

        if (listMasterFullInfo) handleSetListMaster(listMasterFullInfo);
    }, [data, handleSetCompanyInfo, handleSetListMaster, listMasterFullInfo]);

    return (
        <>
            {data && listMaster && listService ? (
                <div className={cx("main-container")}>
                    <main
                        className={cx(
                            "main",
                            permissionsPage.includes(location) && "main-with-tabbar",
                        )}
                    >
                        {children}
                    </main>
                    {location === ROUTES.CALENDAR && (
                        <FixedLayout style={{ bottom: 100 }}>
                            <div onClick={() => onOpen()} className={cx("btn-add")}>
                                <SvgIcon name="Add" />
                            </div>
                        </FixedLayout>
                    )}

                    {permissionsPage.includes(location) && (
                        <FixedLayout>
                            <Tabbar>
                                {tabs.map(({ id, label, Icon, link }) => (
                                    <Tabbar.Item
                                        className={cx("tab", location === link && "tab-active")}
                                        key={id}
                                        text={label}
                                        selected={location === link}
                                        onClick={() => {
                                            href(link);
                                            handleResetBooking();
                                        }}
                                    >
                                        <SvgIcon
                                            className={cx(
                                                location === link ? "tab-icon-active" : "tab-icon",
                                            )}
                                            name={Icon}
                                        />
                                    </Tabbar.Item>
                                ))}
                            </Tabbar>
                        </FixedLayout>
                    )}
                </div>
            ) : (
                <div className={cx("loader")}>
                    <Spinner size="l" />
                </div>
            )}
            <ModalAddRecordMaster dateTime="2022-01-01" isOpen={isModalOpen} onClose={onClose} />
        </>
    );
};
