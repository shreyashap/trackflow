import { logger } from "./logger";
import pinoHttp from "pino-http";


export const httpLogger = pinoHttp({ 
    logger,
    genReqId : (req) => req.id,
    customLogLevel(req, res, err) {
        if (err || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    },
})