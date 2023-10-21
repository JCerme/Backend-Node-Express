import { logger } from "../helpers/logger.js";

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(''); // Empty line for better readability
    req.logger.http(
        `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()} from ${req.ip}`
    );
    next();
}