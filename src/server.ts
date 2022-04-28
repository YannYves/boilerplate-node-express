import express, { Express } from "express";
import cors from "cors";
import movieRoute from "./routes/movie";
import { createClient } from "redis";

const app: Express = express();

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
