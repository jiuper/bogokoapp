import type { ReactNode } from "react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import cnBind from "classnames/bind";

import styles from "./ModalSwiper.module.scss";

const cx = cnBind.bind(styles);
export interface ModalProps {
    fullscreen?: boolean;
    isOpen: boolean;
    isClose?: boolean;
    onClose: () => void;
    title?: string;
    hasHeader?: boolean;
    className?: string;
    containerClassName?: string;
    children: ReactNode;
}
export const ModalSwiper = ({
    isOpen,
    onClose,
    children,
    isClose,
    fullscreen,
    title,
    hasHeader,
    className,
    containerClassName,
}: ModalProps) => {
    const [position, setPosition] = useState(0);

    const handlers = useSwipeable({
        onSwiping: (eventData) => {
            setPosition(eventData.deltaX);
        },
        onSwiped: () => {
            setPosition(0);
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className={cx("modal")} {...handlers}>
            {isClose && (
                <div className={cx("actions")}>
                    <button
                        aria-label="Mute volume"
                        type="button"
                        className={cx("action")}
                        onClick={onClose}
                    />
                </div>
            )}
            <div
                className={cx("container", containerClassName, { fullscreen })}
                style={{ transform: `translateX(${position}px)` }}
            >
                {hasHeader && (
                    <div className={cx("header")}>
                        <h3 className={cx("title")}>{title}</h3>
                        {isClose && (
                            <div className={cx("actions")}>
                                <button
                                    aria-label="Mute volume"
                                    type="button"
                                    className={cx("action")}
                                    onClick={onClose}
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className={cx("content", className, { fullscreen })}>{children}</div>
            </div>
        </div>
    );
};
