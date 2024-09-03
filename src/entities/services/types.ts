export interface ServiceDateTimes {
    id: string;
    name: string;
    image: string;
    time: string;
    price: string;
}

export interface GetCategoryWithServiceDto {
    id?: string;
    name?: string;
    services: ServiceDateTimes[];
}
