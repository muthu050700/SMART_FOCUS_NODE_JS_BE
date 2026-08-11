import type { Request, Response } from "express"
import updateLeadStatusService from "../services/updateLeadStatus.service.js";
import { INTERNAL_ERROR_MESSAGE, LEAD_STATUS_UPDATED_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE } from "../utils/constant.js";
import mongoose from "mongoose";
import type { LeadStatusValidation } from "../validations/updateLeadStatus.validation.js";

const updateLeadStatusController = async (req: Request, res: Response) => {
    try {
        const body: LeadStatusValidation = req.body;
        const leadId: string = req.params.id as string;

        updateLeadStatusService(body, leadId);

        res.status(SUCCESS_STATUS_CODE).send({
            success: true,
            message: LEAD_STATUS_UPDATED_SUCCESS_MESSAGE
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

export default updateLeadStatusController;