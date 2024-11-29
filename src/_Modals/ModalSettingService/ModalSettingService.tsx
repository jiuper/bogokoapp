import { forwardRef, useImperativeHandle } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/_Modals/Modal";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import { UploadImage } from "@/view/SettingPage/components/UploadImage";

import styles from "./ModalSettingService.module.scss";

const cx = cnBind.bind(styles);
export const MODAL_SETTING_SERVICE_DEFAULT_VALUES: ModalSettingServiceState = {
    caption: "",
    files: [],
    price: "",
    description: "",
    time: "",
};

export type ModalSettingServiceModel = ModalSettingServiceState;

export type ModalSettingServiceState = {
    id?: string;
    files?: File[];
    caption?: string;
    description?: string;
    time?: string;
    price?: string;
};
export type ModalSettingServiceRef = {
    setFormValues: (values: ModalSettingServiceModel) => void;
    clearValues: () => void;
};

interface ModalSettingServiceProps {
    onSubmit: (data: ModalSettingServiceModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalSettingService = forwardRef<ModalSettingServiceRef, ModalSettingServiceProps>(
    ({ isLoading, onSubmit, type, onClose, isOpen }, ref) => {
        const formik = useFormik({
            initialValues: MODAL_SETTING_SERVICE_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values });
            },
        });

        const isEditType = type === "edit";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...values },
                })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_SETTING_SERVICE_DEFAULT_VALUES },
                })),
        }));

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <form className={cx("form")} onSubmit={formik.handleSubmit}>
                    <UploadImage onChange={(e) => formik.setFieldValue("files", e)} />
                    <div className={cx("block")}>
                        <InputText
                            isFullWidth
                            label="Добавьте название"
                            name="caption"
                            onChange={formik.handleChange}
                            value={formik.values.caption}
                        />
                        <InputTextarea
                            isFullWidth
                            label="Добавьте описание"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        <InputText
                            isFullWidth
                            label="Продолжительность"
                            name="time"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                        />
                        <InputText
                            isFullWidth
                            label="Стоимость"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />
                    </div>
                    <div className={cx("btns")}>
                        <Button
                            label={submitBntLabel}
                            variant="solid"
                            type="submit"
                            loading={isLoading}
                        />
                    </div>
                </form>
            </Modal>
        );
    },
);
