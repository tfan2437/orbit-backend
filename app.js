import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";

import connectToDatabase from "./database/mongodb.js";

import userRouter from "./routes/user.route.js";
import testRouter from "./routes/test.route.js";
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tests", testRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
