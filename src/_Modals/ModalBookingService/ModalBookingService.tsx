import { Button, Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import styles from "./ModalBookingService.module.scss";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
const cx = cnBind.bind(styles)
type ModalBookingServiceProps = {
    isOpen: boolean;
    count?: number;
    price?: number;
    time?: number;
};
export const ModalBookingService = ({isOpen,count,time,price}: ModalBookingServiceProps) => {

    return (
        <Modal open={isOpen} modal={false} >
            <div className={cx("modal-booking-service")}>
                <div className={cx("description-order")}>
                    <div className={cx("count-service")}>
                        <span>{count}</span>
                        <SvgIcon name={"notebook"}/>
                    </div>
                    <div className={cx("time-price")}>
                        <span>{time}/{price}</span>
                    </div>
                </div>
                <Button label="К дате и времени"/>
            </div>
        </Modal>
    );
};