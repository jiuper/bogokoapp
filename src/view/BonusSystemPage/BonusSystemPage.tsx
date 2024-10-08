import { useCallback, useState } from "react";
import cnBind from "classnames/bind";

import { DiscountBonus } from "@/view/BonusSystemPage/components/DiscountBonus";
import { FriendsBonus } from "@/view/BonusSystemPage/components/FriendsBonus";
import { MainBonus } from "@/view/BonusSystemPage/components/MainBonus";
import { RulesBonus } from "@/view/BonusSystemPage/components/RulesBonus";

import styles from "./BonusSystemPage.module.scss";

const cx = cnBind.bind(styles);
type BonusSystemPage = {};
export const BonusSystemPage = ({}: BonusSystemPage) => {
    const [tab, setTab] = useState(0);
    const handleTab = useCallback((num: number) => setTab(num), []);

    return (
        <div className={cx("bonus-system-page")}>
            {tab === 0 ? <MainBonus handleTab={handleTab} /> : null}
            {tab === 3 ? <FriendsBonus handleTab={handleTab} /> : null}
            {tab === 2 ? <DiscountBonus handleTab={handleTab} /> : null}
            {tab === 1 ? <RulesBonus handleTab={handleTab} /> : null}
        </div>
    );
};
