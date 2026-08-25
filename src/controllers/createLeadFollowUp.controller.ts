import mongoose from "mongoose";
import type { Request, Response } from "express";
import { INTERNAL_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE } from "../utils/constant.js";
import createLeadFollowUpService from "../services/createLeadFollowUp.service.js";
import type { LeadFollowUpValidation } from "../validations/createLeadFollowUps.validation.js";

const createLeadFollowUps = async (req: Request, res: Response) => {
    try {
        const body: LeadFollowUpValidation = req.body;
        const leadId = req?.params?.id as string;
        const userId = req?.user?._id;

        await createLeadFollowUpService(body, leadId, userId);

        res.send({
            success: true,
            message: SAVE_SUCCESS_MESSAGE,
            data: []
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

export default createLeadFollowUps;