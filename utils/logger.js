const fs = require("fs").promises;
const path = require("path");

const loggerMiddleware = async (req, res, next) => {
    const start = Date.now();
    const { method, url } = req;
    const serverFile = path.join(__dirname, "server.log");

    res.on("finish", async () => {
        const duration = Date.now() - start;
        const log = `[${new Date().toISOString()}] ${method} ${res.statusCode} ${req.originalUrl} ${duration}ms`;
        try {
            await fs.appendFile(serverFile, log + "\n");
        } catch (error) {
            console.error("Error writing to log file", error);
        }
    });

    next();
};

module.exports = loggerMiddleware;