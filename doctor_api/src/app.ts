import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerDefinition from "./swagger/swaggerDefinition.json";

import { router } from "@routes/.";
import errorHandler from "@middleware/errorHandle.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);

/** Global Middleware for swagger */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

/** Global Middleware for error handling */
app.use(errorHandler);

export default app;
