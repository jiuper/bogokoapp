import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import type { ServiceDateTimes } from "@/entities/masters/types.ts";
import { useOrderCreateMutation } from "@/entities/order/api/createOrderMasterApi";
import type { RequestRecordDto } from "@/entities/order/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import type { BookingData } from "@/shared/redux/reducers/booking.reducer.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { Button } from "@/shared/ui/_Button";
import { InputPhone } from "@/shared/ui/_InputPhone";
import { UIInputText } from "@/shared/ui/_InputText/InputText.tsx";
import { UIInputTextarea } from "@/shared/ui/_InputTextarea/InputTextarea.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { SignupSchema } from "@/shared/utils/validation.ts";

import styles from "./FormOrder.module.scss";

const cx = cnBind.bind(styles);
type FormOrderProps = {
    queryParams: BookingData[];
};
export const FormOrder = ({ queryParams }: FormOrderProps) => {
    const href = useNavigate();
    const dispatch = useAppDispatch();
    const { mutate: createOrder, isPending } = useOrderCreateMutation();
    const onSubmit = () => {
        const createOrderParams = queryParams.reduce<RequestRecordDto[]>((acc, el) => {
            acc.push({
                firstName: formik.values.firstName,
                phone: formik.values.phone.replace("+", " "),
                comment: formik.values.comment,
                time:
                    `${el.workData?.date.replace(/[.]/g, "-").split("-").reverse().join("-")} ${
                        el.workData?.time || ""
                    }` || "",
                masters: [
                    {
                        masterId: el?.masterInfo?.id || "",
                        serviceId: el?.masterInfo?.services?.map((elem) => String(elem.id) || "") || [],
                    },
                ],
            });

            return acc;
        }, []);

        const onSuccess = () => {
            href(ROUTES.RECORD);
            dispatch(bookingSliceActions.setBookingMastersReset());
            void formik.setValues({ firstName: "", phone: "", comment: "" });
        };
        createOrder(createOrderParams[0], { onSuccess });
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            phone: "",
            comment: "",
        },
        validationSchema: SignupSchema,
        onSubmit: () => {
            onSubmit();
            formik.resetForm();
        },
    });
    const listData = queryParams.reduce<ServiceDateTimes[]>((acc, el) => {
        acc.push(...(el.masterInfo?.services || []));

        return acc;
    }, []);
    const price = listData.reduce((acc, el) => acc + +el.price, 0);
    const time = listData.reduce((acc, el) => acc + +el.time, 0);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={cx("form", "form-wrapper")}>
                <div className={cx("item")}>
                    <UIInputText
                        label="Ваше имя*"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        type="text"
                        name="firstName"
                        onBlur={formik.handleBlur}
                        isFullWidth
                        error={
                            formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : undefined
                        }
                    />
                </div>

                <div className={cx("item")}>
                    <InputPhone
                        label="Телефон*"
                        value={formik.values.phone}
                        onChange={(e) => formik.setFieldValue("phone", e)}
                        onBlur={formik.handleBlur}
                        name="phone"
                        isFullWidth
                        error={formik.errors.phone && formik.touched.phone ? formik.errors.phone : undefined}
                    />
                </div>
                <div className={cx("item")}>
                    <UIInputTextarea
                        label="Комментарии"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        name="comment"
                        isFullWidth
                    />
                </div>
            </div>

            <div className={cx("modal-booking-service", "form-wrapper")}>
                <div className={cx("description-order")}>
                    <div className={cx("count-service")}>
                        <span>{listData.length}</span>
                        <SvgIcon className={cx("icon")} name="notebook" />
                    </div>
                    <div className={cx("time-price")}>
                        <span>
                            {`${time} мин`} / {`${price} руб`}
                        </span>
                    </div>
                </div>
                <Button
                    loading={isPending}
                    disabled={!!formik.errors.phone}
                    onClick={onSubmit}
                    className={cx("button")}
                    label={formik.errors.phone ? "Укажите телефон" : "Подтвердить запись"}
                />
                <span className={cx("text")}>Даю согласие на обработку персональных данных</span>
            </div>
        </form>
    );
};
