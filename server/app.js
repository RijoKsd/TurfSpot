import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";


const app = express();

app.use(
  cors({
    origin: "*", //backend link
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);
app.options(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());

// routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;