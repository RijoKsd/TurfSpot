import connectDB from "./config/database.js";
import dotenv from "dotenv";
import app from "./app.js";
import chalk from "chalk";

dotenv.config();

const port = process.env.PORT || 3000;

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
