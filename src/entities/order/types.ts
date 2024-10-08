import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";

export interface RequestRecordDto {
    firstName: string;
    phone: string;
    comment?: string;
    time: string;
    recordInfo: GetMasterFullInfoDto;
    masters: RequestMasterServicesRecordDto[];
}

export interface RequestMasterServicesRecordDto {
    masterId: string;
    serviceId: string[];
}

export type RequestGetDateTimesDto = {
    date?: string;
    masters: RequestMasterServicesRecordDto[];
};

export type RequestGetDatesTrueDto = {
    dateFrom: string;
    dateTo: string;
    masters: RequestMasterServicesRecordDto[];
};

export interface GetMasterServiceDateTimesMulti {
    workData?: WorkDataInfo;
}

export interface WorkDataInfo {
    dateTrue?: string[];
    dateNear?: string;
    times?: string[];
}
