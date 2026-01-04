import jwt,{Jwt, JwtPayload} from "jsonwebtoken";
import { findUserById } from "../repository/auth.repository";
import { NextFunction,Request,Response } from "express";
import { AppError } from "../errors/app-error";
import { logger } from "../logger/logger";
import { env } from "../../config";
import { asyncHandler } from "../utils/async-handler";


interface CustomJwtPayload extends JwtPayload{
    sub : string;
}


const decodeToken = (token: string,tokenSecret:string) => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    logger.warn("JWT verification failed");
    throw new AppError("Invalid or expired token", 401);
  }
};


const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const accessTokenSecret  = env.accessTokenSecret as string;

  const decoded = decodeToken(token,accessTokenSecret) as CustomJwtPayload;

  const user = await findUserById(decoded.sub);
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  req.user = {
    id: user.id,
    role: user.role,
  };

  next();
});

const verifyRefreshToken = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken){
      logger.error('No refresh token provided in cookies')
      throw new AppError("Session expired, please login again", 401);
   }
   const refreshTokenSecret = env.refreshTokenSecret as string;
   const decoded  = decodeToken(refreshToken,refreshTokenSecret) as CustomJwtPayload;

   const user = await findUserById(decoded.sub);

   if(!user){
      logger.error('Unauthorize request')
      throw new AppError("Unauthorized request", 401);
   }

   req.user = {
     id : user.id,
     role : user.role
   }

   next();
})


export {verifyJWT,verifyRefreshToken};