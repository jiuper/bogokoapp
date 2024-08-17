import cnBind from "classnames/bind";

import { Modal } from "@/_Modals/Modal";
import inst from "@/shared/assets/icon/Group 21.svg";
import tg from "@/shared/assets/icon/Group 22.svg";
import tiktok from "@/shared/assets/icon/tiktok_logo.svg";
import vk from "@/shared/assets/icon/vk icon.svg";
import { ButtonIconArrow } from "@/shared/ui/ButtonIcon";

import styles from "./ModalSocialNetworks.module.scss";

const cx = cnBind.bind(styles);

type ModalSocialNetworksProps = {
    isOpen: boolean;
    onClose: () => void;
    listHrefNetworks: string[];
};
export const ModalSocialNetworks = ({ isOpen, onClose, listHrefNetworks }: ModalSocialNetworksProps) => {
    const listNetworks = [
        { icon: vk, name: "Вконтакте" },
        { icon: tg, name: "Телеграм" },
        { icon: inst, name: "Инстаграм" },
        { icon: tiktok, name: "Тикток" },
    ];

    return (
        <Modal maxWidth="100%" hasHeader="Социальные сети" isOpen={isOpen} onClose={onClose}>
            <div className={cx("networks-list")}>
                {listNetworks.map((el, i) => (
                    <ButtonIconArrow color="empty" key={i} path={listHrefNetworks[i]} label={el.name} icon={el.icon} />
                ))}
            </div>
        </Modal>
    );
};
