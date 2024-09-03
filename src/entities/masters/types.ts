export type GetMasterDto = {
    id?: string;
    name: string;
    post?: string;
    image?: string;
};

export interface GetMasterServiceDateTimes {
    id?: string;
    name?: string;
    image?: string;
    serviceName?: string;
    serviceImage?: string;
    time?: string;
    price?: string;
    workData?: WorkData;
}

export interface WorkData {
    dateTrue?: string[];
    dateNear?: string;
    times?: string[];
}

export interface GetMasterFullInfoDto {
    id?: string;
    name?: string;
    post?: string;
    description?: string;
    image?: string;
    gallery?: Gallery[];
    services?: ServiceDateTimes[];
    currency?: Currency;
    rating?: number;
}

export interface Currency {
    id?: number;
    title?: string;
    abbr?: string;
    iso?: string;
}

export interface Gallery {
    big?: string;
    zoom?: string;
}

export interface ServiceDateTimes {
    id: string;
    name: string;
    image: string;
    time: string;
    price: string;
}
export interface GetMastersMultiDto {
    serviceId?: string;
    masters?: MasterMultiInfo[];
}

export interface MasterMultiInfo {
    masterId?: string;
    masterName?: string;
    masterImage?: string;
    serviceName?: string;
    serviceImage?: string;
    cost?: string;
    time?: string;
    currency?: string;
}
