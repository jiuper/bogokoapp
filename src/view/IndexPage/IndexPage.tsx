import type { FC } from "react";
import { useState } from "react";
import cnBind from "classnames/bind";

import { useInfoCompanyQuery } from "@/entities/company/api/getInfoCompanyApi";
import DEF from "@/shared/assets/images/Cover.png";
import AVATAR from "@/shared/assets/images/image 19.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Carousel } from "@/shared/ui/_Carousel";
import { AddressCompany } from "@/view/IndexPage/components/AddressCompany";
import { DescriptionCompany } from "@/view/IndexPage/components/DescriptionCompany";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./IndexPage.module.scss";

const cx = cnBind.bind(styles);
export const IndexPage: FC = () => {
    const { data } = useInfoCompanyQuery();
    const listLink = [
        { name: "Выбрать услугу", href: ROUTES.SERVICES, icon: "notebook" },
        { name: "Выбрать мастера", href: ROUTES.BOOKING, icon: "add-master" },
    ];
    const [products] = useState([data?.image || DEF, data?.image || DEF, data?.image || DEF]);

    return (
        <div className={cx("bg-wrapper")}>
            <Carousel value={products} />

            <div className={cx("wrapper", "container")}>
                <AddressCompany city="Витебск" address="ул. Кирова 12 каб.20" avatar={AVATAR} map="" />
                <LinkGroup listLink={listLink} />
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
