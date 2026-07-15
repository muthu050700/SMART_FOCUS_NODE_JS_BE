import type { Request, Response } from "express";
import createLeadService from "../services/lead.service.js"
import { INTERNAL_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE, VALIDATION_FAILED_MESSAGE } from "../utils/constant.js";
import type { CreateLeadInput } from "../validations/lead.validation.js";
import mongoose from "mongoose";
import { leadAssignmentService } from "../services/leadAssignment.service.js";
import { LeadModel } from "../models/lead.model.js";

const createLead = async (req: Request, res: Response) => {
    try {
        const body: CreateLeadInput = req.body;
        const validatedBodyData = await createLeadService(body);

        // const lead = await createLead(body);
        const assignedCounsellorId = await leadAssignmentService();

        const leadUser = await LeadModel.create({
            ...validatedBodyData,
            assignedCounsellor: assignedCounsellorId
        })

        return res.status(SUCCESS_STATUS_CODE).json({
            success: true,
            message: SAVE_SUCCESS_MESSAGE,
            data: leadUser
        });
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: VALIDATION_FAILED_MESSAGE,
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
            message: INTERNAL_ERROR_MESSAGE
        });
    }
}

export default createLead;