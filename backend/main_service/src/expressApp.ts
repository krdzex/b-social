import express from "express";
import userRouter from "./api/user.routes";
import postRouter from "./api/post.routes";
import commentRouter from "./api/comment.routes";
import errorHandler from "./utils/errorHandler";
import jsonResponseMiddleware from "./middlewares/json-response.middleware";
import passport from "passport";
import passportStrategy from "./config/passport.config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectProducer } from "./kafkaProducer";

const app = express();

passportStrategy(passport);
app.use(passport.initialize());

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

app.use(express.json());

app.use(jsonResponseMiddleware);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectProducer().catch(console.error);

app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", commentRouter);

app.use(errorHandler);

export default app;
