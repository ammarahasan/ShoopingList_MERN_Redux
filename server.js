import express from "express";
import mongoose from "mongoose";
import { db } from "./config/keys.js";
import items from "./routes/api/items.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.relative(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.port || 5000;
mongoose
  .connect(db.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`server listen to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/items", items);
