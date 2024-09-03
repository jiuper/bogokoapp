import { useEffect, useState } from "react";

import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";

export const useBookingService = () => {
    const [serviceId, setServiceId] = useState<string>("");
    const [servicesId, setServicesId] = useState<string[]>([]);
    const [isOpenModalService, onOpenModalService, onCloseModalService] = useBooleanState(false);
    const [isOpenModalBookingService, onOpenModalBookingService, onCloseModalBookingService] = useBooleanState(false);

    const handleOpenModalService = (id?: string, flag?: boolean) => {
        if (flag && id) {
            setServiceId(id);
            onOpenModalService();
        }

        if (id && !flag) {
            if (servicesId.includes(id)) {
                setServicesId(servicesId.filter((el) => el !== id));
            } else {
                setServicesId([...servicesId, id]);
            }
        }
    };
    const handleOpenModalDetailsService = (id?: string) => {
        if (id)
            if (servicesId.includes(id)) {
                setServicesId(servicesId.filter((el) => el !== id));
            } else {
                setServicesId([...servicesId, id]);
            }
        onCloseModalService();
    };

    useEffect(() => {
        if (servicesId.length === 0) onCloseModalBookingService();
        else onOpenModalBookingService();
    }, [servicesId.length]);

    return {
        servicesId,
        serviceId,
        isOpenModalBookingService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalService,
        handleOpenModalDetailsService,
    };
};
