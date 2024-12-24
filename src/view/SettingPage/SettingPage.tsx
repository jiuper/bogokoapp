import { NavigationLayout } from "@/layouts/NavigationLayout";
import { BonusSetting } from "@/view/SettingPage/components/BonusSetting";
import { CompanySetting } from "@/view/SettingPage/components/CompanySetting";
import { PersonalSetting } from "@/view/SettingPage/components/PersonalSetting";
import { PersonalAddSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalAddSetting";
import { PersonalInfoSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalInfoSetting";
import { ProfileSetting } from "@/view/SettingPage/components/ProfileSetting";
import { ServiceSetting } from "@/view/SettingPage/components/ServiceSetting";
import { ServicesSetting } from "@/view/SettingPage/components/ServiceSetting/ServicesSetting";

const componentMap = {
    company: CompanySetting,
    services: ServiceSetting,
    setting: ProfileSetting,
    serviceDetail: ServicesSetting,
    personal: PersonalSetting,
    personalDetail: PersonalInfoSetting,
    personalAdd: PersonalAddSetting,
    bonus: BonusSetting,
};
export const SettingPage = () => {
    return (
        <NavigationLayout
            initialComponent="setting"
            componentMap={componentMap}
            componentProps={{}}
        />
    );
};
