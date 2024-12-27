import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { CardStaff } from "@/view/IndexPage/components/ListTop/components/CardStaff";

import "swiper/css/free-mode";
import "swiper/css";

import styles from "./ListTop.module.scss";

const cx = cnBind.bind(styles);
type ListTop = {
    personal: GetMasterFullInfoDto[];
};
export const ListTop = ({ personal }: ListTop) => {
    const href = useNavigate();

    return (
        <div className={cx("personal-list")}>
            <div className={cx("title")}>
                <span>Персонал {`(${personal.length})`}</span>
                <span onClick={() => href(ROUTES.BOOKING)}>См. всех</span>
            </div>
            <div className={cx("list-staff")}>
                <Swiper
                    slidesPerView={2.3}
                    slideToClickedSlide
                    spaceBetween={10}
                    speed={1000}
                    freeMode
                    modules={[FreeMode]}
                >
                    {personal.map((el, i) => (
                        <SwiperSlide key={i}>
                            <CardStaff
                                persona={el}
                                onClick={() => href(`${ROUTES.MASTER}/${el.id}`)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
