import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import def from "@/shared/assets/images/Empty-image-icon.png";
import { InputText } from "@/shared/ui/_InputText";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ProfileSetting.module.scss";

const cx = cnBind.bind(styles);
type ProfileSettingProps = {
    handleTabClick: (tab: number) => void;
};
const listSetting = ["Кабинет", "Услуги", "Персонал", "Товары", "Отчёты"];

export const ProfileSetting = ({ handleTabClick }: ProfileSettingProps) => {
    return (
        <div className={cx("profile-setting")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={def} />
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>Анастасия Иванова</span>
                        <span className={cx("post")}>Администратор</span>
                    </div>
                </div>
                <div className={cx("account")}>
                    <span className={cx("title")}>Аккаунт</span>
                    <div className={cx("info")}>
                        <InputText
                            isFullWidth
                            label="ФИО"
                            value="Иванова Анастасия Ивановна"
                            disabled
                        />
                        <InputText isFullWidth label="Должность" value="Администратор" disabled />
                    </div>
                </div>
                <div className={cx("setting")}>
                    <span className={cx("title")}>Настройки</span>
                    <div className={cx("info")}>
                        {listSetting.map((el, i) => (
                            <div
                                onClick={() => handleTabClick(i + 1)}
                                key={i}
                                className={cx("item")}
                            >
                                <span className={cx("name")}>{el}</span>
                                <SvgIcon name="ArrowRight" className={cx("arrow")} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
