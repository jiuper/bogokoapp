export interface GetCompanyDto {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    schedule?: CompanySchedule[];
    phones?: string[];
    address?: string;
    currencyAbbr?: string;
}

export interface CompanySchedule {
    day?: string;
    workFrom?: string;
    workTo?: string;
}