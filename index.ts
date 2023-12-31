import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./src/utils/logger";
import cors from "cors";
import rootRouter from "./src/routes";
import handleGlobalError from "./src/utils/globalErrorHandler.utils";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("No mongodb connection string, set in .env");

const initMongoDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGODB_URI);
    logger.info("connected to db");
  } catch (error) {
    logger.error(`Could not connect to db: ${error}`);
  }
};

const initServer = async () => {
  try {
    await initMongoDb();
    app.use(express.json());
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use("/api", rootRouter);
    app.use(handleGlobalError);
  } catch (error) {
    logger.error(`Could not start server: ${error}`);
  }
};

initServer();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
