import express from "express";
import mongoose from "mongoose";
import items from "./routes/api/items.js";
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";
import cors from "cors";
import path from "path";
import config from "config";

const app = express();
app.use(cors());
app.use(express.json());

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.relative(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.port || 5000;
const db = config.get("mongoURL");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server listen to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);
