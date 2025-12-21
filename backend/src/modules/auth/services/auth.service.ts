import { AppError } from "../../../shared/errors/app-error";
import { logger } from "../../../shared/logger/logger";

import { RegisterInput } from "../../types";
import { registerUser,findUserByEmail} from "../../../shared/repository/auth.repository";


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
}

export const authService = new AuthService();