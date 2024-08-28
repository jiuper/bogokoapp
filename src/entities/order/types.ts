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
    serviceInfo?: ServiceInfo[];
}
