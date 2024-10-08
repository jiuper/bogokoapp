import type { MasterServiceInfo } from "@/entities/masters/types.ts";

export interface GetCategoryWithServiceDto {
    id?: string;
    name?: string;
    services: MasterServiceInfo[];
}
