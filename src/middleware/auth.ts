import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUser } from "../utils/helperFunctions.js";
import User from "../models/user.model.js";
import type { CreateUserInput } from "../validations/user.validation.js";
import mongoose, { Types } from "mongoose";
import { INTERNAL_ERROR_MESSAGE, JWT_SECRET, TOKEN_VALIDATION_MESSAGE, VALIDATION_FAILED_MESSAGE } from "../utils/constant.js";

interface Iuser {
    _id: Types.ObjectId,
    role: string
}

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) throw new Error(TOKEN_VALIDATION_MESSAGE);

        const decodedMsg = jwt.verify(token, JWT_SECRET);
        const { _id } = decodedMsg as Iuser;

        const user = await User.findOne({ _id: _id });
        req.user = user;
        next();
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

export default userAuth;