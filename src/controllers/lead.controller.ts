import type { Request, Response } from "express";
import createLeadService from "../services/lead.service.js"
import { INTERNAL_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE, VALIDATION_FAILED_MESSAGE } from "../utils/constant.js";
import type { CreateLeadInput } from "../validations/lead.validation.js";
import mongoose from "mongoose";

const createLead = async (req: Request, res: Response) => {
    try {
        const body: CreateLeadInput = req.body;
        const learUser = await createLeadService(body);

        return res.status(SUCCESS_STATUS_CODE).json({
            success: true,
            message: SAVE_SUCCESS_MESSAGE,
            data: learUser
        });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: VALIDATION_FAILED_MESSAGE,
            });
        }

        return res.status(500).json({
            success: false,
            message: INTERNAL_ERROR_MESSAGE
        });
    }
}

export default createLead;