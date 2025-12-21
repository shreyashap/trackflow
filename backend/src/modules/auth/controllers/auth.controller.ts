import {Request,Response} from "express"
import { AppError } from "../../../shared/errors/app-error";
import { authService } from "../services/auth.service";
import { hashPassword } from "../../utils";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { RegisterResponse } from "../../types";

class AuthController {
    registerUser = asyncHandler (async (req:Request,res:Response<{data : RegisterResponse,message : string}>) => {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            throw new AppError('All fields are required',400);
        }

        if(password.length < 6){
            throw new AppError('Password must be at least 6 characters long',400);
        }

        const hashedPassword = await hashPassword(password);

        const user = await authService.register({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message:'User registered successfully',
            data:{
                id:user.id,
                name:user.name as string,
                email:user.email,
                role: user.role
            }
        });
    })
    
}

export const authController = new AuthController();

