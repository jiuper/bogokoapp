import { useState } from "react";
import cnBind from "classnames/bind";

import { CompanySetting } from "@/view/SettingPage/components/CompanySetting";
import { ProfileSetting } from "@/view/SettingPage/components/ProfileSetting";

import styles from "./SettingPage.module.scss";

const cx = cnBind.bind(styles);
type SettingPageProps = {};
export const SettingPage = ({}: SettingPageProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tab: number) => setActiveTab(tab);

    return (
        <div className={cx("control-panel")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content", activeTab === 0 ? "active" : "")}>
                    <ProfileSetting handleTabClick={handleTabClick} />
                </div>
                <div className={cx("tab-content", activeTab === 1 ? "active" : "")}>
                    <CompanySetting handleTabClick={handleTabClick} />
                </div>
                <div className={cx("tab-content", activeTab === 2 ? "active" : "")}>
                    <ProfileSetting handleTabClick={handleTabClick} />
                </div>
            </div>
        </div>
    );
};
