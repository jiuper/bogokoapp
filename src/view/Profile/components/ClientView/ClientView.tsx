import { useState } from "react";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { TabMenu } from "primereact/tabmenu";

import type { UserData } from "@/entities/user/types.ts";
import avatar from "@/shared/assets/icon/Avatar.svg";
import { useBooleanState } from "@/shared/hooks";
import { Checkbox } from "@/shared/ui/_Checkbox";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { BiometricsCard } from "@/view/Profile/components/ClientView/components/BiometricsCard";

import styles from "./ClientView.module.scss";

const cx = cnBind.bind(styles);
type ClientViewProps = {
    user: UserData | null;
};
const items = [{ label: "Прогресс" }, { label: "Биометрия" }];

const list = [
    { value: 10, name: "За 10 дней" },
    { value: 15, name: "За 15 дней" },
    { value: 30, name: "За 30 дней" },
    { value: 3, name: "За 3 месяца" },
];
export const ClientView = ({ user }: ClientViewProps) => {
    const [, openModal] = useBooleanState(false);
    const [_, setId] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [dropdownValue, setDropDownValue] = useState<number>(10);
    const handleDropdownChange = (val: number) => setDropDownValue(val);
    const handleIsOpen = (id: string) => {
        setId(id);
        openModal();
    };

    return (
        <div className={cx("client-profile")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={avatar} />
                        <Badge className={cx("badge")} type="number">
                            3.9
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{user?.role || "Денис Иванов"}</span>
                        <span className={cx("post")}>+375298745896</span>
                    </div>
                </div>

                <div className={cx("body")}>
                    <div className={cx("tab-menu")}>
                        <TabMenu
                            model={items}
                            activeIndex={activeIndex}
                            onTabChange={(e) => setActiveIndex(e.index)}
                        />
                        <Dropdown
                            options={list}
                            value={dropdownValue}
                            optionLabel="name"
                            onChange={(e) => handleDropdownChange(e.value as number)}
                            placeholder="Выберите период"
                            className={cx("dropdown")}
                        />
                        <div className={cx("description-wrapper")}>
                            <div className={cx("description")}>
                                <p>
                                    Всего занятий: <span>{dropdownValue}</span>
                                </p>
                                <p>
                                    Без тренера: <span> {dropdownValue}</span>
                                </p>
                            </div>
                            <div className={cx("description")}>
                                <p>
                                    Период: <span>{dropdownValue}</span>
                                </p>
                                <p>
                                    С тренером: <span>{dropdownValue}</span>
                                </p>
                            </div>
                        </div>
                        {activeIndex === 0 && (
                            <div className={cx("checkboxes")}>
                                <Checkbox checked disabled label="Прогресс доступен тренеру" />
                                <Checkbox checked label="Прогресс доступен всем" />
                            </div>
                        )}
                    </div>
                    {activeIndex === 1 && (
                        <div className={cx("biometrics")}>
                            {Array.from({ length: dropdownValue }, (_, i) => (
                                <BiometricsCard
                                    onClick={() => handleIsOpen((i + 1).toString())}
                                    key={i}
                                    name="25.08.2024 08:00"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
