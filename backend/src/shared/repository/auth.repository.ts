import {prisma} from "../../lib/prisma";

export const registerUser = async(data:{
    name : string,
    email : string,
    password : string
})=>{
    const user = await prisma.user.create({data})
    return user;
}


export const findUserByEmail = async(email:string)=>{
    const user= await prisma.user.findFirst({where : {
        email,
        isDeleted : false
    }})

    return user;
}
