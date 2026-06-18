import type { Request, Response } from "express";
import type { LoginValidation } from "../validations/login.validation.js";
import authUserLoginService from "../services/login.service.js";
import { INTERNAL_ERROR_MESSAGE, LOGIN_SUCCESSFULL_MESSAGE, SAVE_SUCCESS_MESSAGE } from "../utils/constant.js";
import mongoose from "mongoose";

const login = async (req: Request, res: Response) => {
    try {
        const body: LoginValidation = req.body;

        const token = await authUserLoginService(body);

        res.cookie("token", token, { expires: new Date(7 * 24 * 60 * 60 * 1000), httpOnly: true, sameSite: "strict" });
        res.json({ succes: true, message: LOGIN_SUCCESSFULL_MESSAGE });
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

export default login;