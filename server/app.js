import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;