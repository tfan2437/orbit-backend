import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";

import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import { verifyToken } from "./middleware/auth.middleware.js";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use("/api/users", verifyToken, userRouter);
app.use("/api/chats", verifyToken, chatRouter);

app.get("/", (req, res) => {
  res.send("Orbit AI");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
