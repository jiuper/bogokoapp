import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { FormOrder } from "@/_Forms/FormOrder";
import notFound from "@/shared/assets/icon/Avatar.svg";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useAppDispatch, useAppSelector } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";

import styles from "./OrderPage.module.scss";

const cx = cnBind.bind(styles);

export const OrderPage = () => {
    const href = useNavigate();
    const dispatch = useAppDispatch();

    const queryParams = useAppSelector((state) => state.booking.bookingMasters);

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
                        rating={el.masterInfo?.rating || 4.1}
                        avatar={el.masterInfo?.image || notFound}
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

            <FormOrder queryParams={queryParams} />
        </div>
    );
};
