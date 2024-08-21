export type GetMasterDto = {
    id?: string;
    name: string;
    post?: string;
    image?: string;
};

export interface GetMasterServiceDatetimes {
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
    id: string;
    name?: string;
    post?: string;
    description?: string;
    image?: string;
    gallery?: Gallery[];
    services?: ServiceDateTimes[];
    currency?: Currency;
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
    time: number;
    price: number;
}
