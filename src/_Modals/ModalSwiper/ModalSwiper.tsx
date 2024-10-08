import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import cnBind from "classnames/bind";

import styles from "./ModalSwiper.module.scss";

const cx = cnBind.bind(styles);
type ModalSwiperProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};
export const ModalSwiper = ({ isOpen, children }: ModalSwiperProps) => {
    const [position, setPosition] = useState(0);

    const handlers = useSwipeable({
        onSwiping: (eventData) => {
            setPosition(eventData.deltaX);
        },
        onSwiped: () => {
            setPosition(0);
        },
    });

    if (!isOpen) return null;

    return (
        <div className={cx("modal-overlay", isOpen && "open")} {...handlers}>
            <div className="swipe-content" style={{ transform: `translateX(${position}px)` }}>
                {children}
            </div>
        </div>
    );
};
