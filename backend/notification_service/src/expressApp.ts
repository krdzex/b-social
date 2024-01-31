import express from "express";
import cors from "cors";
import { connectConsumer } from "./kafkaConsumer";

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

app.use(express.json());
connectConsumer();

export default app;
