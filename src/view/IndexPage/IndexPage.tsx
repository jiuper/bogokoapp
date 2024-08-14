import type { FC } from "react";
import cnBind from "classnames/bind";

import { useInfoCompanyQuery } from "@/entities/company/api/getInfoCompanyApi";
import DEF from "@/shared/assets/images/Cover.png";
import AVATAR from "@/shared/assets/images/image 19.png";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { DescriptionCompany } from "@/view/IndexPage/components/DescriptionCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./IndexPage.module.scss";

const cx = cnBind.bind(styles);
export const IndexPage: FC = () => {
    const { data } = useInfoCompanyQuery();

    return (
        <div className={cx("bg-wrapper")}>
            <img className={cx("image-company")} src={data?.image || DEF} alt="DEF" />
            <div className={cx("wrapper", "container")}>
                <AddressCompany city="Витебск" address="ул. Кирова 12 каб.20" avatar={AVATAR} map="" />
                <LinkGroup />
                <ReferralBlock countCredits={10} />
                <DescriptionCompany
                    description={
                        data?.description ||
                        "Мы уверены в качестве своего обслуживания и даем абсолютную гарантию на результат."
                    }
                />
            </div>
        </div>
    );
};
