import * as dotenv from "dotenv";
dotenv.config();

import { WebServer } from "./webserver";
import { sequelize } from "./database";

import * as logger from './utils/logger'

(async () => {
    logger.info("Initializing database...");
    
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logger.success("Database successfully initialized !");
    } catch(ex) {
        logger.error("Failed to connect to database : " + ex);
        process.exit();
    }

    logger.info("Starting API server...");
    const web = new WebServer();
    await web.run();
})();