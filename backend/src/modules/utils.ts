import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { logger } from "../shared/logger/logger";
import { AppError } from "../shared/errors/app-error";



export const hashPassword = async (password : string)=>{
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}

export const validatePassword = async (password:string,hashedPassword:string)=>{
   const isValid = await bcrypt.compare(password,hashedPassword);
   return isValid;
}

export const generateToken = async (
  user: { id: string; role: Role },
  tokenSecret: string,
  tokenExpiry: string | number
): Promise<string> => {
  try {
    const token = jwt.sign(
      { sub : user.id,role : user.role },
      tokenSecret,
      { expiresIn: tokenExpiry }
    );

    return token;
  } catch (error) {
    logger.error(`Token generation failed : ${error}`);
    throw new AppError('Token generation failed', 500);
  }
};
