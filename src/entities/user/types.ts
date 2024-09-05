export interface ResponseAuthDto {
    role: string;
    token: string;
}
export enum UserRole {
    SuperAdministrator = 1,
    Administrator = 10,
    Master = 20,
    User = 30,
    Broker = 40,
}
