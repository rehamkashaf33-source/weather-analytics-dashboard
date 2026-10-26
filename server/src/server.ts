import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const server = app.listen(env.PORT, () => logger.info(`API listening on :${env.PORT}`));

const shutdown = () => server.close(() => process.exit(0));
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
