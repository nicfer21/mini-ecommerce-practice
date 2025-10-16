declare enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}
export {};
