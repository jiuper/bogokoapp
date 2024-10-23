import { useState } from "react";
import cnBind from "classnames/bind";
import type { CarouselProps } from "primereact/carousel";
import { Carousel as UICarousel } from "primereact/carousel";

import { SwipeableWrapper } from "@/components/SwipeableWrapper";

import styles from "./Carousel.module.scss";

const cx = cnBind.bind(styles);
type UICarouselProps = CarouselProps & {
    classNameImage?: string;
    template?: (product: any) => JSX.Element;
};
export const Carousel = ({
    value,
    className,
    classNameImage,
    template,
    numScroll,
    numVisible,
}: UICarouselProps) => {
    const listImage: string[] = value as string[];
    const [page, setPage] = useState(0);

    const onPageChange = (e: number) => setPage(e);

    const responsiveOptions = [
        {
            breakpoint: "767px",
            numVisible: numVisible || 1,
            numScroll: numScroll || 1,
        },
        {
            breakpoint: "575px",
            numVisible: numVisible || 1,
            numScroll: numScroll || 1,
        },
    ];
    const productTemplate = (product: string) => {
        return <img className={cx("image-company", classNameImage)} src={product} alt="DEF" />;
    };

    return (
        <SwipeableWrapper
            onSwipedLeft={() => setPage((prevPage) => (prevPage + 1) % listImage.length)}
            onSwipedRight={() =>
                setPage((prevPage) => (prevPage - 1 + listImage.length) % listImage.length)
            }
        >
            <UICarousel
                value={value}
                numVisible={numVisible || 1}
                numScroll={numScroll || 1}
                showIndicators={listImage.length > 1}
                showNavigators={false}
                responsiveOptions={responsiveOptions}
                itemTemplate={template || productTemplate}
                className={cx("carousel", className)}
                page={page}
                onPageChange={(e) => onPageChange(e.page)}
            />
        </SwipeableWrapper>
    );
};
