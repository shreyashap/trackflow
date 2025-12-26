
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
