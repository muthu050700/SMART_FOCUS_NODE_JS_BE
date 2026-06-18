import express from "express";
import login from "../controllers/login.controller.js";

const loginRoute = express.Router();

loginRoute.post("/", login);

export default loginRoute;