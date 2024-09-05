import cnBind from "classnames/bind";
import type { CarouselProps } from "primereact/carousel";
import { Carousel as UICarousel } from "primereact/carousel";

import styles from "./Carousel.module.scss";

const cx = cnBind.bind(styles);
type UICarouselProps = CarouselProps & {
    classNameImage?: string;
};
export const Carousel = ({ value, className, classNameImage }: UICarouselProps) => {
    const listImage: string[] = value as string[];
    const responsiveOptions = [
        {
            breakpoint: "767px",
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];
    const productTemplate = (product: string) => {
        return <img className={cx("image-company", classNameImage)} src={product} alt="DEF" />;
    };

    return (
        <UICarousel
            value={value}
            numVisible={1}
            numScroll={1}
            showIndicators={listImage.length > 1}
            showNavigators={false}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
            className={cx("carousel", className)}
        />
    );
};
