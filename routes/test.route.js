import { Router } from "express";
import {
  createTest,
  getTests,
  getTestByEmail,
} from "../controller/test.controller.js";

const testRouter = Router();

testRouter.post("/", createTest);
testRouter.get("/", getTests);
testRouter.get("/:email", getTestByEmail);

export default testRouter;
