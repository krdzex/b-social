import express from "express";
import userRouter from "./api/user.routes";
import postRouter from "./api/post.routes";
import errorHandler from "./utils/errorHandler";
import jsonResponseMiddleware from "./middlewares/json-response.middleware";
import passport from "passport";
import passportStrategy from "./config/passport.config";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.use("/", userRouter);
app.use("/", postRouter);

app.use(errorHandler);

export default app;
