import { Role } from "../../../generated/prisma/enums";


export type RoleType = Role;
declare global{
    namespace Express{ 
        interface Request {
            id : string;
            user: {
                id: string;
                role: RoleType;
            };
        }
    }
}

export interface RegisterInput{
    name : string;
    email : string;
    password : string
}


export interface LoginInput{
    email : string;
    password : string
}


export interface RegisterResponse{
    id : string;
    name : string;
    email : string;
    role : 'USER' | 'ADMIN'
}

export interface LoginResponse{
    user : {
        name: string | null;
        email: string;
        id: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    },
    accessToken : string;
}
