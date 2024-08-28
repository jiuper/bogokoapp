import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { UIInputText } from "@/shared/ui/_InputText/InputText.tsx";
import { UIInputTextarea } from "@/shared/ui/_InputTextarea/InputTextarea.tsx";

import styles from "./FormOrder.module.scss";

const cx = cnBind.bind(styles);
type FormOrderProps = {
    onSubmit?: (values: { name: string; phone: string; comment: string }) => void;
};
export const FormOrder = ({ onSubmit }: FormOrderProps) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            comment: "",
        },
        onSubmit: (values) => {
            onSubmit?.(values);
            formik.resetForm();
        },
    });

    return (
        <form className={cx("form-wrapper")} onSubmit={formik.handleSubmit}>
            <div className={cx("form")}>
                <UIInputText
                    label="Ваше имя*"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    name="name"
                    isFullWidth
                />
                <UIInputText
                    label="Телефон*"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type="text"
                    name="phone"
                    isFullWidth
                />
                <UIInputTextarea
                    label="Комментарии"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    name="comment"
                    isFullWidth
                />
            </div>
        </form>
    );
};
