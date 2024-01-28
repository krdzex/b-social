import express from "express";
import userRouter from "./api/user.routes";
import errorHandler from "./utils/errorHandler";
import jsonResponseMiddleware from "./middlewares/json-response.middleware";
import passport from 'passport';
import passportStrategy from './passport.config';
import cookieParser from 'cookie-parser';

const app = express();

passportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());

app.use(jsonResponseMiddleware);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);

app.use(errorHandler);

export default app;