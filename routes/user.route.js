import { Router } from "express";
import { createUser, getUser } from "../controller/user.controller.js";
const userRouter = Router();

userRouter.get("/:uid", getUser);

userRouter.post("/", createUser);

export default userRouter;
