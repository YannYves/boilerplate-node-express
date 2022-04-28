import express, { Express } from "express";
import cors from "cors";
import movieRoute from "./routes/movie";
import { createClient } from "redis";
import mongoose from "mongoose";

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

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

export { app, redisClient };
