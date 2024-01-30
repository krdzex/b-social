import express from "express";
import cors from "cors";

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

export default app;
