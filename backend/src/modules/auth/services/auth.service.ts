import { AppError } from "../../../shared/errors/app-error";
import { logger } from "../../../shared/logger/logger";

import { RegisterInput ,LoginInput} from "../../types";
import { registerUser,findUserByEmail} from "../../../shared/repository/auth.repository";
import { validatePassword,generateToken} from "../../utils"
import { env} from "../../../config/index"
import { RoleType } from "../../types";


class AuthService {
    async register(data:RegisterInput){
        const isUserExist = await findUserByEmail(data.email);
        if(isUserExist){
            logger.warn(`User already exists with email ${data.email}`);
            throw new AppError('User already exists',400);
        }

        const user = await registerUser(data);
        return user;

    }

    async login(data:LoginInput){
       const user = await findUserByEmail(data.email);
       if(!user){
            logger.warn(`User does not exist ${data.email}`);
            throw new AppError('User does not exist',404)
       }

       const password  = user.password;

       const isPasswordValid = await validatePassword(data.password,password);
       if(!isPasswordValid){
         logger.warn('Invalid email or password');
         throw new AppError('Invalid email or password',400)
       }

       const {password:hashedPassword,isDeleted,...userData} = user;


       const accessTokenSecret = env.accessTokenSecret;
       const accessTokenExpiry = env.accessTokenExpiry;
       const refreshTokenSecret = env.refreshTokenSecret;
       const refreshTokenExpiry = env.refreshTokenExpiry;


       const [accessToken,refreshToken ] = await Promise.all([generateToken(userData,accessTokenSecret,accessTokenExpiry),generateToken(userData,refreshTokenSecret,refreshTokenExpiry)])
    
       if(!accessToken || !refreshToken){
            logger.error('Failed to generate access & refresh tokens');
            throw new AppError('Internal server error')
       }

       return {userData,accessToken,refreshToken}

    }

    async refreshAccessToken(user: {id:string,role:RoleType}){
        const accessTokenSecret = env.accessTokenSecret;
        const accessTokenExpiry = env.accessTokenExpiry;


        const accessToken = await generateToken(user,accessTokenSecret,accessTokenExpiry);

        if(!accessToken){
            logger.error('Failed to refresh access token');
            throw new AppError('Internal server error')
        }

        return accessToken;
    }

}

export const authService = new AuthService();