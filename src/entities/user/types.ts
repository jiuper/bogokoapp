export interface UserData {
    role: number;
    token: string;
}
export enum UserRole {
    DIRECTOR = 20,
    ADMINISTRATOR = 30,
    MASTER = 40,
    CLIENT = 50,
    ADMIN = 10,
    SUPERADMIN = 1,
    USER = 60,
}
