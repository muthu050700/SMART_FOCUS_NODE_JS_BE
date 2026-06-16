import express, { type Request, type Response } from "express";
import type { CreateUserInput } from "../validations/user.validation.js";
import { createUserService } from "../services/user.service.js";
import { INTERNAL_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE, SUCCESS_STATUS_CODE, VALIDATION_FAILED_MESSAGE } from "../utils/constant.js";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response) => {
    try {
        const body: CreateUserInput = req.body;

        const user = await createUserService(body);

        res.status(SUCCESS_STATUS_CODE).json({
            success: true,
            message: SAVE_SUCCESS_MESSAGE,
            data: user
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