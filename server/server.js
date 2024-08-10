import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());

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

// routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 1234;

// Function to start the server
const startServer = async () => {
  try {
    // First, connect to the database
    await connectDB();

    // If database connection is successful, start the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
