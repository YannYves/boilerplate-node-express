import { app } from "./server";
import mongoose, { ConnectOptions } from "mongoose";

const PORT: number | string = process.env.PORT!;

//TEMPLATE FOR API CALL

// app.listen(PORT, () => {
//   console.log(`server running on http://localhost:${PORT}`);
// });

// TEMPLATE FOR DB CONNEXION

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.k5xvv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

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
