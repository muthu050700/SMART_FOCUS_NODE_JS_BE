import type { Model } from "mongoose";
import { EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX } from "./constant.js";

export const isUserAlreadyLoggedIn = async <T>(email: string, model: Model<T>): Promise<boolean> => {
    const user = await model.findOne({ email });
    return !!user;
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