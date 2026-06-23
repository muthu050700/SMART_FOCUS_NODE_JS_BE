import { Model } from "mongoose";
import { EMAIL_VALIDATION_REGEX, JWT_SECRET, PASSWORD_SALT_ROUNDS, PASSWORD_VALIDATION_REGEX } from "./constant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const isUserAlreadyLoggedIn = async <T>(email: string, model: Model<T>): Promise<boolean> => {
//     const user = await model.findOne({ email });
//     return !!user;
// }

export const getUser = async <T>(email: string, model: Model<T>): Promise<T | null> => {
    return await model.findOne({ email });
}

export const isReqBodyExitsFn = (body: object): boolean => {
    return !(Object.keys(body).length > 0);
}

export const isEmailIdValid = (email: string): boolean => {
    if (!email) return false;
    return !(EMAIL_VALIDATION_REGEX.test(email));
}

export const isPasswordValidCheck = (password: string) => {
    if (!password) return false;
    return !(PASSWORD_VALIDATION_REGEX.test(password));
}

export const passwordHashFn = async (password: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    return hashPassword;
}

export const isPasswordMatchFn = async (password: string, dbPassword: string) => {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return !isMatch;
}

export const generateJWTToken = (id: string, role: string): string => {
    const token = jwt.sign({ _id: id, role }, JWT_SECRET, { expiresIn: "7d" });
    return token;
}

export const isAdminFn = (userRole: string): boolean => {
    return userRole === "admin";
}