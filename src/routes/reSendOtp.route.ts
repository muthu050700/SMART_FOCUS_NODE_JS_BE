import express from "express";
import reSendOtp from "../controllers/reSendOtp.controller.js";

const reSendOtpRoute = express.Router();
console.log("resend from route")
reSendOtpRoute.post("/", reSendOtp);

export default reSendOtpRoute;