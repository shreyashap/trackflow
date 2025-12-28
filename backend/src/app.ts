import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// import { requestLogger } from "./shared/middleware/request-logger.middleware";
import { errorMiddleware } from "./shared/middleware/error.middleware";
import { requestIdMiddleware } from "./shared/middleware/request-id.middleware";
import { httpLogger } from "./shared/logger/http-logger";

import { healthRouter } from "./modules/health/health.route";
import { authRouter } from "./modules/auth/routes/auth.route";


export const createApp = () => {
    const app = express();


    app.use(requestIdMiddleware);
    app.use(httpLogger);
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use("/auth",authRouter);


    app.use("/health", healthRouter);
    app.use(errorMiddleware);

    return app;
};