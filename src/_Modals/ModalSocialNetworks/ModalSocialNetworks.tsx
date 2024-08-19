import cnBind from "classnames/bind";

import inst from "@/shared/assets/icon/Group 21.svg";
import tg from "@/shared/assets/icon/Avatar.svg";
import tiktok from "@/shared/assets/icon/tik.svg";
import vk from "@/shared/assets/icon/vk icon.svg";
import { ButtonIconArrow } from "@/shared/ui/ButtonIcon";

import styles from "./ModalSocialNetworks.module.scss";
import { Modal } from "@telegram-apps/telegram-ui";

const cx = cnBind.bind(styles);

type ModalSocialNetworksProps = {
    isOpen: boolean;
    onClose: () => void;
    listHrefNetworks: string[];
};
export const ModalSocialNetworks = ({ isOpen, onClose, listHrefNetworks }: ModalSocialNetworksProps) => {
    const listNetworks = [
        { icon: vk, name: "Вконтакте", label: "Посетить" },
        { icon: tg, name: "Телеграм", label: "Написать" },
        { icon: inst, name: "Инстаграм", label: "Посетить" },
        { icon: tiktok, name: "Тикток", label: "Посетить" },
    ];
    const handleOpen = (open: boolean) => {
        if (!open) onClose();
    };
    return (
        <Modal open={isOpen} onOpenChange={(open) => handleOpen(open)}>
            <div className={cx("modal-social-networks")}>
                <span className={cx("title")}>Социальные сети</span>
                <div className={cx("networks-list")}>
                    {listNetworks.map((el, i) => (
                        <ButtonIconArrow color="empty" key={i} path={listHrefNetworks[i]} label={el.name}
                                         icon={el.icon} text={el.label} />
                    ))}
                </div>
            </div>

        </Modal>
    );
};
