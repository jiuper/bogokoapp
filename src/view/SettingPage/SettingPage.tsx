import { NavigationLayout } from "@/layouts/NavigationLayout";
import { ROUTES } from "@/shared/const/Routes.ts";
import { BonusSetting } from "@/view/SettingPage/components/BonusSetting";
import { CompanySetting } from "@/view/SettingPage/components/CompanySetting";
import { PersonalSetting } from "@/view/SettingPage/components/PersonalSetting";
import { PersonalAddSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalAddSetting";
import { PersonalInfoSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalInfoSetting";
import { ProfileSetting } from "@/view/SettingPage/components/ProfileSetting";
import { ServiceSetting } from "@/view/SettingPage/components/ServiceSetting";
import { ServicesSetting } from "@/view/SettingPage/components/ServiceSetting/ServicesSetting";

const componentMap = {
    [`${ROUTES.SETTING}/company`]: (props: object) => <CompanySetting {...props} />,
    [`${ROUTES.SETTING}/services`]: (props: object) => <ServiceSetting {...props} />,
    [ROUTES.SETTING]: (props: object) => <ProfileSetting {...props} />,
    [`${ROUTES.SETTING}/serviceDetail/:id`]: (props: object) => <ServicesSetting {...props} />,
    [`${ROUTES.SETTING}/personal`]: (props: object) => <PersonalSetting {...props} />,
    [`${ROUTES.SETTING}/personalDetail/:id`]: (props: object) => <PersonalInfoSetting {...props} />,
    [`${ROUTES.SETTING}/personalAdd`]: (props: object) => <PersonalAddSetting {...props} />,
    [`${ROUTES.SETTING}/bonus`]: (props: object) => <BonusSetting {...props} />,
};

const componentProps = {
    [`${ROUTES.SETTING}/company`]: {},
    [`${ROUTES.SETTING}/services`]: {},
    [ROUTES.SETTING]: {},
    [`${ROUTES.SETTING}/serviceDetail/:id`]: {},
    [`${ROUTES.SETTING}/personal`]: {},
    [`${ROUTES.SETTING}/personalDetail/:id`]: {},
    [`${ROUTES.SETTING}/personalAdd`]: {},
    [`${ROUTES.SETTING}/bonus`]: {},
};

export const SettingPage = () => {
    return (
        <NavigationLayout
            initialComponent={ROUTES.SETTING}
            componentMap={componentMap}
            componentProps={componentProps}
        />
    );
};
