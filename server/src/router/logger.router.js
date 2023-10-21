import { Router } from "express";
const router = Router();

router.get("/loggerTest", (req, res) => {
    // Test all levels
    req.logger.debug("This is a debug message");
    req.logger.http("This is a http message");
    req.logger.info("This is an info message");
    req.logger.warning("This is a warning message");
    req.logger.error("This is an error message");
    req.logger.fatal("This is a fatal message");
    res.send("Check the file for the logs");
});

export default router;