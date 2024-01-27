import express from "express";
import userRouter from "./api/user.routes";

const app = express();
app.use(express.json());

app.use("/", userRouter);

export default app;