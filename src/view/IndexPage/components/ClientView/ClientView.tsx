import cnBind from "classnames/bind";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import { Carousel } from "@/shared/ui/_Carousel";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { DescriptionCompany } from "@/view/IndexPage/components/DescriptionCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./ClientView.module.scss";

const cx = cnBind.bind(styles);
type IndexPageProps = {
    companyInfo: GetCompanyDto | null;
    listLink: { name: string; icon: string; onClick: () => void }[];
};
export const ClientView = ({ companyInfo, listLink }: IndexPageProps) => {
    return (
        <div className={cx("bg-wrapper")}>
            <Carousel value={[companyInfo?.image]} />
            <div className={cx("wrapper", "container")}>
                <AddressCompany
                    address={companyInfo?.address}
                    city={companyInfo?.city}
                    map={{
                        lat: companyInfo?.coordinateLat,
                        lon: companyInfo?.coordinateLon,
                    }}
                />
                <LinkGroup listLink={listLink} />
                <ReferralBlock
                    countCredits={10}
                    currencyShortTitle={companyInfo?.currencyShortTitle}
                />
                <DescriptionCompany description={companyInfo?.description} />
            </div>
        </div>
    );
};
