import express from "express";
import { createUser } from "../controllers/auth.controller.js";
import userAuth from "../middleware/auth.js";

const registerRouter = express.Router();

registerRouter.post("/", userAuth, createUser);

export default registerRouter;