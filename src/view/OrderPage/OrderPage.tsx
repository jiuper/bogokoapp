import cnBind from "classnames/bind";

import { FormOrder } from "@/_Forms/FormOrder";
import avatar from "@/shared/assets/images/photo_2023-08-17_18-11-08.jpg";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";

import styles from "./OrderPage.module.scss";

const cx = cnBind.bind(styles);
type OrderPageProps = {};
export const OrderPage = ({}: OrderPageProps) => {
    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Проверьте запись</span>
            </div>
            <div className={cx("cards")}>
                <CardOrder
                    icon="edit"
                    rating={4.0}
                    avatar={avatar}
                    name="Константин Константинопольский"
                    post="Ногтевой мастер"
                />
                <CardOrder
                    icon="edit"
                    rating={4.0}
                    avatar={avatar}
                    name="Константин Константинопольский"
                    post="Ногтевой мастер"
                    price="30 BYN"
                />
                <CardOrder icon="remove" name="Константин Константинопольский" post="Ногтевой мастер" />
            </div>

            <FormOrder />
        </div>
    );
};
