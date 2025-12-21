import { createApp } from "./app";
import { env } from "./config";
import { logger } from "./shared/logger/logger";


export const startServer = () => {
    const app = createApp();

    const server = app.listen(env.port, () => {
        logger.info(`Server running on port ${env.port}`);
    });

    const shutdown = () => {
        logger.info("Shutting down server...");
        server.close(() => process.exit(0));
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
};