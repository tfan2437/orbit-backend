import express from "express";
import cors from "cors";
import { PORT, NODE_ENV } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";

import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import { verifyToken } from "./middleware/auth.middleware.js";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Basic security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use("/api/users", verifyToken, userRouter);
app.use("/api/chats", verifyToken, chatRouter);

app.get("/", (req, res) => {
  res.send("Orbit AI");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message =
    NODE_ENV === "production" ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    status: "error",
    message,
  });

  // Pass to next error handler if exists
  if (next) next(err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application continues running
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Graceful shutdown
  process.exit(1);
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
