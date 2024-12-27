import { useNavigate } from "react-router";

import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { DiscountBonus } from "@/view/BonusSystemPage/components/DiscountBonus";
import { FriendsBonus } from "@/view/BonusSystemPage/components/FriendsBonus";
import { MainBonus } from "@/view/BonusSystemPage/components/MainBonus";
import { RulesBonus } from "@/view/BonusSystemPage/components/RulesBonus";

const componentMap = {
    [`${ROUTES.BONUS}/discount`]: (props: () => void) => <DiscountBonus {...props} />,
    [`${ROUTES.BONUS}/friends`]: (props: () => void) => <FriendsBonus {...props} />,
    [ROUTES.BONUS]: (props: object) => <MainBonus {...props} />,
    [`${ROUTES.BONUS}/rules`]: (props: () => void) => <RulesBonus {...props} />,
};
export const BonusSystemPage = () => {
    const href = useNavigate();
    const onBack = () => href(ROUTES.BONUS);

    const componentProps = {
        [`${ROUTES.BONUS}/discount`]: { onBack },
        [`${ROUTES.BONUS}/friends`]: { onBack },
        [`${ROUTES.BONUS}/rules`]: { onBack },
    };

    return (
        <NavigationLayout
            initialComponent={ROUTES.BONUS}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
