import cnBind from "classnames/bind";
import { useFormik } from "formik";

import slider3 from "@/shared/assets/Slide01 (2).png";
import slider2 from "@/shared/assets/Slide02 (2).png";
import slider1 from "@/shared/assets/Slide03.png";
import { Button } from "@/shared/ui/_Button";
import { Carousel } from "@/shared/ui/_Carousel";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";

import styles from "./CompanySetting.module.scss";

const cx = cnBind.bind(styles);
type CompanySettingProps = {
    handleTabClick: (tab: number) => void;
};
export const CompanySetting = ({ handleTabClick }: CompanySettingProps) => {
    const formik = useFormik({
        initialValues: {
            city: "",
            address: "",
            description: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className={cx("company-setting")}>
            <div className={cx("main-banner")}>
                <Carousel value={[slider1, slider2, slider3]} />
            </div>
            <form onSubmit={formik.handleSubmit} className={cx("edit-info", "container")}>
                <InputText
                    isFullWidth
                    name="city"
                    label="Город"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                />
                <InputText
                    isFullWidth
                    name="address"
                    label="Адрес"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                />
                <InputTextarea
                    isFullWidth
                    name="description"
                    label="Описание"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
            </form>
            <div className={cx("button")}>
                <Button variant="outlined" onClick={() => handleTabClick(0)} label="К настройкам" />
            </div>
        </div>
    );
};
