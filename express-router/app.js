import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./dbConnect.js"

//apiRouter is the alias of the router
import apiRouter from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js";

// Load environment variables
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

//APP LEVEL MIDDLE WARE
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://mytasky.vercel.app', 'https://mytasky-frontend.vercel.app', 'https://mytask-beryl.vercel.app'],
  credentials: true
}));

app.get("/", (req, res) => {
    res.status(200).json({ success: "This is Tasky Application" });
})

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);

app.listen(port, () => {
    console.log("Server Started at Port : ", port);
})

