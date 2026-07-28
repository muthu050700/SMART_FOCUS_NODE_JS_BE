import type { Request, Response } from "express";
import mongoose from "mongoose";
import { INTERNAL_ERROR_MESSAGE, OTP_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE } from "../utils/constant.js";
import type { VerifyOtpValidation } from "../validations/verifyOtp.validation.js";
import verifyOtpService from "../services/verifyOtp.service.js";

const verifyOtp = async (req: Request, res: Response) => {
    try {
        const body: VerifyOtpValidation = req.body;

        const verifiedLead = await verifyOtpService(body);

        res.status(SUCCESS_STATUS_CODE).send({
            success: true,
            data: verifiedLead,
            message: OTP_SUCCESS_MESSAGE
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

export default verifyOtp;