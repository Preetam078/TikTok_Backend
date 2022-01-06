import express from "express";
import mongoose from "mongoose";
import Videos from "./DBmodel.js";

//app config
const app = express();
const port = 8000;

//middleware
app.use(express.json());

//db config
const connectionUrl =
  "mongodb+srv://admin:admin@cluster0.t4iyd.mongodb.net/tiktokBackend?retryWrites=true&w=majority";

mongoose.connect(connectionUrl);

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/v2/posts", (req, res) => {
  Videos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//app listener
app.listen(port, () => {
  console.log(`listening on localhost: ${port}`);
});
