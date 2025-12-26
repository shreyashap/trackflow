import {Request,Response} from "express"
import { AppError } from "../../../shared/errors/app-error";
import { authService } from "../services/auth.service";
import { hashPassword } from "../../utils";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { RegisterResponse } from "../../types";
import { env } from "../../../config";

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

    loginUser = asyncHandler(async(req:Request,res:Response)=>{
        const {email,password } = req.body;

        if(!email || !password){
            throw new AppError('All fields are required',400);
        }

        const {userData,accessToken,refreshToken}  = await authService.login({email,password});

        const nodeEnv = env.nodeEnv;
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/refresh'
        }


        res.status(200).cookie('refreshToken',refreshToken).json({
            message : 'User logged in successfully',
            data : userData,
            accessToken
        })
    })
    
}

export const authController = new AuthController();

