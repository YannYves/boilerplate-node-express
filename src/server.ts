import express, { Express } from "express";
import cors from "cors";
import movieRoute from "./routes/movie";
import { createClient } from "redis";
import mongoose, { ConnectOptions } from "mongoose";

const app: Express = express();

// handle req.body
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// redis cache init + error + ready
const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client is connecting ..."));
redisClient.on("ready", () => console.log("Redis Client is ready "));

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
})();

app.use(cors());
app.use(movieRoute);

export { app, redisClient };
