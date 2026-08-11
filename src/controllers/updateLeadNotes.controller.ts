import mongoose from "mongoose";
import type { Request, Response } from "express";
import { INTERNAL_ERROR_MESSAGE } from "../utils/constant.js";

const updateLeadNotesController = (req: Request, res: Response) => {
    try {
        const body = req.body;

        res.send({
            success: true,
            message: "Successfully updated the Notes."
        })
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

export default updateLeadNotesController;