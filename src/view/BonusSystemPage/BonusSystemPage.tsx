import { useNavigate } from "react-router";

import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { DiscountBonus } from "@/view/BonusSystemPage/components/DiscountBonus";
import { FriendsBonus } from "@/view/BonusSystemPage/components/FriendsBonus";
import { MainBonus } from "@/view/BonusSystemPage/components/MainBonus";
import { RulesBonus } from "@/view/BonusSystemPage/components/RulesBonus";

const componentMap = {
    discount: (props: () => void) => <DiscountBonus {...props} />,
    friends: (props: () => void) => <FriendsBonus {...props} />,
    bonus: (props: object) => <MainBonus {...props} />,
    rules: (props: () => void) => <RulesBonus {...props} />,
};
export const BonusSystemPage = () => {
    const href = useNavigate();
    const onBack = () => href(ROUTES.BONUS);

    const componentProps = {
        discount: { onBack },
        friends: { onBack },
        rules: { onBack },
    };

    return (
        <NavigationLayout
            initialComponent="bonus"
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
