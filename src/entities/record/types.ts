import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";

export interface ResponseNewRecordDto {
    recordId?: string;
    ycRecordId?: string;
    ycRecordHash?: string;
    clientName?: string;
    clientPhone?: string;
    clientComment?: string;
    datetime?: string;
    master?: GetMasterFullInfoDto;
    message?: string;
}

export interface ResponseGetRecordShortInfoDto {
    id?: string;
    ycRecordId?: string;
    clientName?: string;
    clientPhone?: string;
    clientComment?: string;
    datetime?: string;
    duration?: number;
    masterName?: string;
    masterImage?: string;
    servicesName: string[];
    currency?: string;
    totalPriceMin?: number;
    totalPriceMax?: number;
    isFeedback?: boolean;
}
