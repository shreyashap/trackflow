import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.route('/register').post(authController.registerUser);

export  {authRouter};