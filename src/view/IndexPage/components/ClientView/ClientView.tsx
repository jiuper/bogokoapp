import { useEffect } from "react";
import cnBind from "classnames/bind";

import { ModalSwiper } from "@/_Modals/ModalSwiper";
import type { GetCompanyDto } from "@/entities/company/types.ts";
import slider3 from "@/shared/assets/Slide01 (2).png";
import slider2 from "@/shared/assets/Slide02 (2).png";
import slider1 from "@/shared/assets/Slide03.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { Carousel } from "@/shared/ui/_Carousel";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { DescriptionCompany } from "@/view/IndexPage/components/DescriptionCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./ClientView.module.scss";

const cx = cnBind.bind(styles);
type IndexPageProps = {
    companyInfo: GetCompanyDto | null;
    listLink: { name: string; icon: string; onClick: () => void }[][];
};
export const ClientView = ({ companyInfo, listLink }: IndexPageProps) => {
    const [isOpen, onOpen, onClose] = useBooleanState(false);

    useEffect(() => {
        if (true) {
            onOpen();
        }
    }, []);

    return (
        <div className={cx("bg-wrapper")}>
            <div className={cx("main-banner")}>
                <Carousel value={[slider1, slider2, slider3]} />
                <Link to={ROUTES.CALENDAR}>
                    <SvgIcon
                        className={cx("notifications", { active: !isOpen })}
                        name="notifications"
                    />
                </Link>
            </div>

            <div className={cx("wrapper", "container")}>
                <AddressCompany
                    address={companyInfo?.address}
                    city={companyInfo?.city}
                    map={{
                        lat: companyInfo?.coordinateLat,
                        lon: companyInfo?.coordinateLon,
                    }}
                />
                {listLink.map((item, i) => (
                    <LinkGroup key={i} listLink={item} />
                ))}
                <ReferralBlock
                    countCredits={10}
                    currencyShortTitle={companyInfo?.currencyShortTitle}
                />
                <DescriptionCompany description={companyInfo?.description} />
            </div>
            <ModalSwiper isOpen={isOpen} onClose={onClose}>
                <div className={cx("modal-rating")}>
                    <div className={cx("text")}>
                        <span className={cx("title")}>Процедура успешно проведена!</span>
                        <span className={cx("subtitle")}>Поделитесь свои впечатлением</span>
                    </div>
                    <Link to={ROUTES.CALENDAR}>
                        <SvgIcon name="ArrowRight" />
                    </Link>
                </div>
            </ModalSwiper>
        </div>
    );
};
