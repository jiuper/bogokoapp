import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Tabbar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { permissionsPage } from "@/shared/const/routing.ts";
import { useNavigationItems } from "@/shared/hooks/useNavigationItems.ts";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./PageLayout.module.scss";

const cx = cnBind.bind(styles);

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const href = useNavigate();
    const tabs = useNavigationItems();
    const location = useLocation().pathname;

    return (
        <div className={cx("main-container")}>
            <main className={cx("main")}>{children}</main>
            {permissionsPage.includes(location) && (
                <Tabbar>
                    {tabs.map(({ id, label, Icon, link }) => (
                        <Tabbar.Item
                            className={cx("tab", location === link && "tab-active")}
                            key={id}
                            text={label}
                            selected={location === link}
                            onClick={() => {
                                href(link);
                            }}
                        >
                            <SvgIcon className={cx(location === link ? "tab-icon-active" : "tab-icon")} name={Icon} />
                        </Tabbar.Item>
                    ))}
                </Tabbar>
            )}
        </div>
    );
};
