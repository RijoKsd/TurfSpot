import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";


const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;