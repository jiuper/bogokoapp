import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { FormOrder } from "@/_Forms/FormOrder";
import { ModalBookingService } from "@/_Modals/ModalBookingService";
import type { ServiceDateTimes } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { useAppDispatch, useAppSelector } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";

import styles from "./OrderPage.module.scss";

const cx = cnBind.bind(styles);

export const OrderPage = () => {
    const href = useNavigate();
    const dispatch = useAppDispatch();

    const queryParams = useAppSelector((state) => state.booking.bookingMasters);
    const [isOpenModalBookingService, onOpenModalBookingService, onCloseModalBookingService] = useBooleanState(true);
    const listData = queryParams.reduce<ServiceDateTimes[]>((acc, el) => {
        acc.push(...(el.masterInfo?.services || []));

        return acc;
    }, []);
    const price = listData.reduce((acc, el) => acc + +el.price, 0);
    const time = listData.reduce((acc, el) => acc + +el.time, 0);
    const handleBlur = () => {
        if (!isOpenModalBookingService) {
            onOpenModalBookingService();
        } else {
            onCloseModalBookingService();
        }
    };
    const handleEditMaster = (id: string) => {
        href(ROUTES.BOOKING);
        dispatch(bookingSliceActions.setEditBookingMasters(id));
    };

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Проверьте запись</span>
            </div>

            {queryParams.map((el, i) => (
                <div key={i} className={cx("cards")}>
                    <CardOrder
                        icon="edit"
                        rating={4.0}
                        avatar={el.masterInfo?.image}
                        name={el.masterInfo?.name}
                        post={el.masterInfo?.post}
                        onClick={() => handleEditMaster(el.masterInfo?.id || "")}
                    />

                    <CardOrder
                        icon="edit"
                        onClick={() => href(`${ROUTES.TIMESBOOKING}/${el.masterInfo?.id}`)}
                        name={el.workData?.date}
                        post={el.workData?.time}
                    />
                    {el.masterInfo?.services?.length !== 0 ? (
                        el.masterInfo?.services?.map((elem) => (
                            <CardOrder
                                key={elem.id}
                                icon="remove"
                                avatar={elem.image}
                                name={elem.name}
                                post={`${elem.time} мин`}
                                price={`${elem.price} ${el.masterInfo?.currency?.abbr}`}
                                onClick={() =>
                                    dispatch(
                                        bookingSliceActions.setRemoveServiceBookingMasters({
                                            id: el.masterInfo?.id || "",
                                            serviceId: elem.id,
                                        }),
                                    )
                                }
                            />
                        ))
                    ) : (
                        <div onClick={() => href(`${ROUTES.MASTER}/${el.masterInfo?.id}`)}>Добавить Услугу</div>
                    )}
                </div>
            ))}

            <FormOrder onFocus={handleBlur} />
            <ModalBookingService
                price={price}
                time={time}
                count={listData.length}
                isOpen={isOpenModalBookingService}
                onClick={onCloseModalBookingService}
                title="Даю согласие на обработку персональных данных"
                label="Укажите телефон"
            />
        </div>
    );
};
