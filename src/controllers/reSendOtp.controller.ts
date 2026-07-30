import type { Request, Response } from "express";
import type { ReSendOtpValidation } from "../validations/reSendOtp.validation.js";
import reSendOtpService from "../services/reSendOtp.service.js";
import { INTERNAL_ERROR_MESSAGE, OTP_SUCCESS_MESSAGE, RESEND_OTP_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE } from "../utils/constant.js";
import mongoose from "mongoose";

const reSendOtp = async (req: Request, res: Response) => {
    try {
        const body: ReSendOtpValidation = req.body;

        const leadUserId = await reSendOtpService(body);

        res.status(SUCCESS_STATUS_CODE).send({
            success: true,
            data: leadUserId,
            message: RESEND_OTP_SUCCESS_MESSAGE
        });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        if (err instanceof Error) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: INTERNAL_ERROR_MESSAGE,
        });
    }

}

export default reSendOtp;