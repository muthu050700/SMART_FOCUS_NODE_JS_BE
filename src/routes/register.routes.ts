import express from "express";
import { createUser } from "../controllers/auth.controller.js";

const registerRouter = express.Router();

registerRouter.post("/", createUser);

export default registerRouter;