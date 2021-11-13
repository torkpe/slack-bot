require("dotenv").config();
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import { logger, stream } from "./utils/logger";
import connectDB from "./utils/db";
import { dbUrl } from "./utils/constants";
const { PORT = 3000, NODE_ENV = "development" } = process.env;

const app = express();
app.use(
  morgan(process.env.NODE_ENV === "development" ? "dev" : "combined", {
    stream,
  })
);
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

routes(app);
app.use(errorMiddleware);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Looks like you're lost",
  });
});

connectDB({ url: dbUrl[NODE_ENV] })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        logger.info(`===================================`);
        logger.info(`======= ENV: ${NODE_ENV} =======`);
        logger.info(`🚀 App listening on the port ${PORT}`);
        logger.info(`=================================`);
      });
    }
  })
  .catch((error: any) => {
    logger.info(error.toString());
  });

export default app;
