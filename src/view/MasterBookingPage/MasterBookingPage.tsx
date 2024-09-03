import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import type { GetMasterDto, GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useAppDispatch } from "@/shared/redux/configStore.ts";
import { bookingSliceActions } from "@/shared/redux/reducers/booking.reducer.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";
import { MasterInfoCardSkeleton } from "@/view/MasterBookingPage/components/MasterInfoCard/MasterInfoCardSkeleton.tsx";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoCardProps = {
    data: GetMasterDto[];
    isPending: boolean;
    isServices?: boolean;
    servicesId: string[];
};
export const MasterBookingPage = ({ data, isPending, isServices, servicesId }: MasterInfoCardProps) => {
    const href = useNavigate();
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterListData = useMemo(
        () => data.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [data, searchValue],
    );

    const onRecord = (id?: string, data?: GetMasterFullInfoDto) => {
        if (!isServices && id) href(`${ROUTES.MASTER}/${id}`);

        if (isServices && id) {
            dispatch(
                bookingSliceActions.setBookingReset({
                    masterInfo: {
                        ...data,
                        services: data?.services?.filter((el) => servicesId.includes(el.id.toString())),
                    },
                }),
            );
            href(`${ROUTES.TIMESBOOKING}/${id}`);
        }
    };

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Мастера</h2>
            <InputSearch value={searchValue} onChange={setSearchValue} />
            <div className={cx("list")}>
                {!isPending ? (
                    filterListData.length !== 0 ? (
                        filterListData.map((el) => <MasterInfoCard onClick={onRecord} key={el.id} {...el} />)
                    ) : (
                        <div className={cx("not-found")}>Мастеров не найдено</div>
                    )
                ) : (
                    Array(10)
                        .fill("")
                        .map((_, i) => <MasterInfoCardSkeleton key={i} />)
                )}
            </div>
        </div>
    );
};
