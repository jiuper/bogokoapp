import { Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import def from "@/shared/assets/images/photo_2023-08-17_18-11-08.jpg";
import { ButtonIcon } from "@/shared/ui/_ButtonIcon";
import { Carousel } from "@/shared/ui/_Carousel";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ModalDetailedService.module.scss";

const cx = cnBind.bind(styles);
type ModalDetailedServiceProps = {
    id?: string;
    name?: string;
    image?: string;
    description?: string;
    time?: string | number;
    price?: string | number;
    isOpen: boolean;
    onClose: () => void;
    onClick?: (id?: string) => void;
};
export const ModalDetailedService = ({
    price,
    time,
    image,
    name,
    isOpen,
    description,
    onClose,
    onClick,
    id,
}: ModalDetailedServiceProps) => {
    const handleOpen = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <Modal
            style={{
                borderRadius: "44px 44px 0 0",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            className={cx("modal-detailed")}
            open={isOpen}
            onOpenChange={(open) => handleOpen(open)}
        >
            <div className={cx("modal-detailed-service")}>
                <div className={cx("header")}>
                    <Carousel classNameImage={cx("image")} value={[image || def]} />
                    <SvgIcon onClick={onClose} className={cx("close")} name="close-bg" />
                    <SvgIcon className={cx("closed-plank")} name="closed-plank" />
                </div>
                <div className={cx("body")}>
                    <div className={cx("description")}>
                        <span className={cx("title")}>{name}</span>
                        {description && <span className={cx("text")}>{description}</span>}
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("time")}>{`${time} мин.`}</span>
                        <span className={cx("price")}>{`${price} руб.`}</span>
                    </div>
                    <ButtonIcon
                        onClick={() => onClick?.(id)}
                        color="orange"
                        className={cx("button")}
                        icon={<SvgIcon name="add-service" />}
                        label={`${price} BYN`}
                    />
                </div>
            </div>
        </Modal>
    );
};
