import { Router } from "express";
import { createUser } from "../controller/user.controller.js";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "GET all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ title: "GET user details" });
});

userRouter.post("/", createUser);

// userRouter.put("/:id", (req, res) => {
//   res.send({ title: "UPDATE user" });
// });

// userRouter.delete("/:id", (req, res) => {
//   res.send({ title: "DELETE user" });
// });

export default userRouter;
