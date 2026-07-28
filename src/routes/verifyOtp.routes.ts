import express from "express";
import verifyOtp from "../controllers/verifyOtp.controller.js";

const verifyOtpRoute = express.Router();

verifyOtpRoute.post("/", verifyOtp);

export default verifyOtpRoute;