import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { verifyJWT, verifyRefreshToken } from "../../../shared/middleware/auth.middleware";

const authRouter = Router();

authRouter.route('/register').post(authController.registerUser);
authRouter.route('/login').post(authController.loginUser);
authRouter.route("/logout").post(verifyJWT,authController.logoutUser);
authRouter.route("/refresh/token").get(verifyRefreshToken,authController.refreshAccessToken);

export  {authRouter};