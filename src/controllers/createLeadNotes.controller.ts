import mongoose from "mongoose";
import type { Request, Response } from "express";
import { INTERNAL_ERROR_MESSAGE, LEAD_NOTES_SUCCESS_MESSAGE } from "../utils/constant.js";
import createLeadNotesService from "../services/createLeadNotes.service.js";
import type { UpdateLeadNotesValidation } from "../validations/updateLeadNotes.validation.js";

const createLeadNotesController = (req: Request, res: Response) => {
    try {
        const body: UpdateLeadNotesValidation = req.body;
        const leadId = req?.params?.id as string;

        // Get loggedIn user Id
        const loggedUserId = req?.user?._id;

        createLeadNotesService(body, leadId, loggedUserId);

        res.send({
            success: true,
            message: LEAD_NOTES_SUCCESS_MESSAGE
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

export default createLeadNotesController;