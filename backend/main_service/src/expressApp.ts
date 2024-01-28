import express from "express";
import userRouter from "./api/user.routes";
import errorHandler from "./utils/errorHandler";
import jsonResponseMiddleware from "./middlewares/json-response.middleware";

const app = express();
app.use(express.json());

app.use(jsonResponseMiddleware);

app.use("/", userRouter);

app.use(errorHandler);

export default app;