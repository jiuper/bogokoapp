export type RequestMasterServicesDateTimesDto = {
    masterId: string;
    serviceId: string[];
};

export type RequestGetDateTimesDto = {
    date?: string;
    masters: RequestMasterServicesDateTimesDto[];
};

export type RequestGetDatesTrueDto = {
    dateFrom: string;
    dateTo: string;
    masters: RequestMasterServicesDateTimesDto[];
};

export interface GetMasterServiceDateTimesMulti {
    masterInfo?: MasterInfo[];
    workData?: WorkDataInfo;
}

export interface WorkDataInfo {
    dateTrue?: string[];
    dateNear?: string;
    times?: string[];
}

export interface ServiceInfo {
    id?: string;
    name?: string;
    image?: string;
    time?: string;
    price?: string;
}

export interface MasterInfo {
    id?: string;
    name?: string;
    image?: string;
    serviceInfo: ServiceInfo[];
}
export interface RequestRecordDto {
    firstName: string;
    phone: string;
    comment?: string;
    time: string;
    masters: RequestMasterServicesDateTimesDto[];
}

export interface ResponseNewRecordDto {
    id?: string;
    time?: string;
    timeTo?: string;
    price?: string;
    duration?: string;
    durationString?: string;
    currency?: Currency;
    master?: MasterRecordInfo;
    services?: ServiceRecordInfo;
}

export interface MasterRecordInfo {
    id?: string;
    name?: string;
    image?: string;
}

export interface ServiceRecordInfo {
    id?: string;
    name?: string;
    price?: string;
    duration?: string;
    durationString?: string;
    image?: string;
}

export interface Currency {
    id?: number;
    title?: string;
    abbr?: string;
    iso?: string;
}
