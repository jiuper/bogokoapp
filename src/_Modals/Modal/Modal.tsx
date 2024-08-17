import type { ReactNode } from "react";
import cnBind from "classnames/bind";
import type { DialogProps } from "primereact/dialog";
import { Dialog } from "primereact/dialog";

import styles from "./style.module.scss";

const cx = cnBind.bind(styles);
export interface ModalProps {
    isOpen: boolean;
    maxWidth?: string;
    onClose: () => void;
    hasHeader?: ReactNode | ((props: DialogProps) => ReactNode);
    className?: string;
    containerClassName?: string;
    classNameRoot?: string;
    children: ReactNode;
    maxHeight?: string;
    maximized?: boolean;
    height?: string;
    showHeader?: boolean;
}
export const Modal = ({
    isOpen,
    onClose,
    children,
    hasHeader,
    maxWidth = "50vh",
    className,
    classNameRoot,
    containerClassName,
    maxHeight = "90%",
    maximized,
    height,
    showHeader = true,
}: ModalProps) => {
    return (
        <Dialog
            style={{ maxWidth, width: "100%", height, maxHeight: `${maxHeight}`, boxShadow: "none" }}
            header={hasHeader}
            className={cx("modal", className)}
            maskClassName={cx("mask", containerClassName)}
            visible={isOpen}
            onHide={onClose}
            closable
            showHeader={showHeader}
            draggable={false}
            position="bottom"
            closeOnEscape
            maximized={maximized}
            blockScroll={isOpen}
            pt={{
                root: { className: cx(classNameRoot) },
                closeButton: { className: cx("header-btn") },
            }}
        >
            {children}
        </Dialog>
    );
};
