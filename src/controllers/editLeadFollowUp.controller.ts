import type { Request, Response } from "express"
import { INTERNAL_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE } from "../utils/constant.js";
import editLeadFollowUpService from "../services/editLeadFollowUp.service.js";
import type { EditFollowUpValidation } from "../validations/editLeadFollowUp.validation.js";
import mongoose from "mongoose";

const editLeadFollowUpController = (req: Request, res: Response) => {
    try {
        const body: EditFollowUpValidation = req?.body;

        const followUpId = req?.params?.followUpId as string;
        const leadId = req?.params?.leadId as string;
        const userId = req?.user?._id;

        editLeadFollowUpService(body, leadId, followUpId, userId);

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

export default editLeadFollowUpController;