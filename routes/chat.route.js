import { Router } from "express";
import {
  createChat,
  getChat,
  getChats,
  updateChat,
  deleteChat,
} from "../controller/chat.controller.js";
const chatRouter = Router();

chatRouter.get("/user/:uid", getChats);

chatRouter.post("/:chat_id", createChat);

chatRouter.get("/:chat_id", getChat);

chatRouter.put("/:chat_id", updateChat);

chatRouter.delete("/:chat_id", deleteChat);

export default chatRouter;
