import cnBind from "classnames/bind";

import { ModalSwiper } from "@/_Modals/ModalSwiper";
import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
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
import { ListTop } from "@/view/IndexPage/components/ListTop";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./CompanyView.module.scss";

const cx = cnBind.bind(styles);
export type CompanyViewProps = {
    companyInfo: GetCompanyDto | null;
    listLink: { name: string; icon: string; onClick: () => void }[][];
    personal: GetMasterFullInfoDto[];
};
export const CompanyView = ({ companyInfo, listLink, personal }: CompanyViewProps) => {
    const [isOpen, _, onClose] = useBooleanState(false);

    return (
        <div className={cx("bg-wrapper")}>
            <div className={cx("main-banner")}>
                <Carousel loop value={[slider1, slider2, slider3]} />
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
                <ListTop personal={personal} />
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
