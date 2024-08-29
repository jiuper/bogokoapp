import { Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import def from "@/shared/assets/images/photo_2023-08-17_18-11-08.jpg";
import { Button } from "@/shared/ui/_Button";

import styles from "./ModalDetailedService.module.scss";

const cx = cnBind.bind(styles);
type ModalDetailedServiceProps = {
    id?: string;
    name?: string;
    image?: string;
    time?: string;
    price?: string;
    isOpen: boolean;
    onClose: () => void;
};
export const ModalDetailedService = ({ price, time, image, name, isOpen, onClose }: ModalDetailedServiceProps) => {
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
                    <Image className={cx("image")} width="100%" height="375px" src={image || def} alt={name} />
                </div>
                <div className={cx("body")}>
                    <div className={cx("description")}>
                        <span className={cx("title")}>{name}</span>
                        <span className={cx("text")}>
                            A classic manicure is the application of regular nail polish. During the treatment, your
                            nails will be filed,buffed and shaped, with proper cuticle care as well.{" "}
                        </span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("time")}>{`${time} мин.`}</span>
                        <span className={cx("price")}>{`${price} руб.`}</span>
                    </div>
                    <Button className={cx("button")} label={`${price} руб.`} onClick={() => {}} />
                </div>
            </div>
        </Modal>
    );
};
