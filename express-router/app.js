import express from "express";
import config from "config";

import "./dbConnect.js"

//apiRouter is the alias of the router

import apiRouter from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js";

const app = express();

const port = config.get("PORT");

//APP LEVEL MIDDLE WARE
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({ success: "This is Tasky Application" });
})

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);

app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})

