import { useState } from "react";
import { Modal as DialogModal } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import type { ButtonProps } from "primereact/button";

import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/_Button";

import styles from "./ConfirmModal.module.scss";

const cx = cnBind.bind(styles);

export type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    message: string;
    submitBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
    closeBtnParams?: Omit<ButtonProps, "handleAction" | "onClick">;
};
export const ConfirmModal = ({
    onClose,
    isOpen,
    message,
    onSubmit,
    submitBtnParams,
    closeBtnParams,
}: ConfirmModalProps) => {
    const handleOpen = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <DialogModal
            style={{
                borderRadius: "44px 44px 0 0",
                padding: "16px",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0px -1px 12px 0px rgba(255, 118, 72, 0.12)",
                backdropFilter: "blur(20px)",
            }}
            className={cx("modal")}
            open={isOpen}
            onOpenChange={(open) => handleOpen(open)}
        >
            <div className={cx("wrapper")}>
                <div className={cx("content")}>{message}</div>
                <div className={cx("actions")}>
                    <Button className={cx("btn-submit")} onClick={onSubmit} label="Принять" {...submitBtnParams} />
                    <Button
                        className={cx("btn-close")}
                        variant="outlined"
                        onClick={onClose}
                        label="Закрыть"
                        {...closeBtnParams}
                    />
                </div>
            </div>
        </DialogModal>
    );
};

export type UseConfirmModalTempData = {
    message: string;
    onSubmit: () => void;
    onClose: () => void;
};
export const useConfirmModal = () => {
    const [isOpen, open, close] = useBooleanState(false);

    const [tempData, setTempData] = useState<UseConfirmModalTempData>({
        message: "",
        onSubmit: () => undefined,
        onClose: () => undefined,
    });

    const withConfirm = (params: UseConfirmModalTempData) => {
        setTempData(params);
        open();
    };

    const modalProps = {
        isOpen,
        message: tempData.message,
        onClose: () => {
            close();
            tempData.onClose();
        },
        onSubmit: () => {
            close();
            tempData.onSubmit();
        },
    };

    return { withConfirm, modalProps };
};
