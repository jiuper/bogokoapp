import { useNavigate } from "react-router";
import { Modal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { Button } from "@/shared/ui/_Button";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ModalBookingService.module.scss";

const cx = cnBind.bind(styles);
type ModalBookingServiceProps = {
    isOpen: boolean;
    count?: number;
    price?: number;
    time?: number;
    masterId?: string;
    serviceId: string[];
};
export const ModalBookingService = ({ isOpen, count, time, price, serviceId, masterId }: ModalBookingServiceProps) => {
    const href = useNavigate();
    const dispatch = useAppDispatch();

    const onRecord = () => {
        href(ROUTES.TIMESBOOKING);
        dispatch(bookingSliceActions.setBookingMasters([{ masterId: masterId || "", serviceId }]));
    };

    return (
        <Modal
            style={{
                borderRadius: "44px 44px 0 0",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            open={isOpen}
            modal={false}
        >
            <div className={cx("modal-booking-service")}>
                <div className={cx("description-order")}>
                    <div className={cx("count-service")}>
                        <span>{count}</span>
                        <SvgIcon className={cx("icon")} name="notebook" />
                    </div>
                    <div className={cx("time-price")}>
                        <span>
                            {`${time} мин`} / {`${price} руб`}
                        </span>
                    </div>
                </div>
                <Button onClick={onRecord} className={cx("button")} label="К дате и времени" />
                <span className={cx("text")}>Услуги можно заказать находясь внутри категории</span>
            </div>
        </Modal>
    );
};
