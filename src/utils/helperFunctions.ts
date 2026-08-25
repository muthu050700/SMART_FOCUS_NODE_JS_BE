import mongoose, { Model } from "mongoose";
import { EMAIL_VALIDATION_REGEX, JWT_SECRET, PASSWORD_SALT_ROUNDS, PASSWORD_VALIDATION_REGEX } from "./constant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LeadAssignmentModel } from "../models/leadAssignmentSettings.js";
import crypto from "crypto";

// export const isUserAlreadyLoggedIn = async <T>(email: string, model: Model<T>): Promise<boolean> => {
//     const user = await model.findOne({ email });
//     return !!user;
// }

interface Teacher { _id: mongoose.Types.ObjectId }

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

export const assignCounsellor = async (teachersList: Teacher[], type: string, index: number): Promise<mongoose.Types.ObjectId> => {

    const selectedTeacher = teachersList[index];
    if (!selectedTeacher) throw new Error("Teacher Not Found.");
    const id = { lastAssignedTeacher: selectedTeacher?._id }

    if (type === "create") await LeadAssignmentModel.create(id);

    if (type === "update") await LeadAssignmentModel.findOneAndUpdate({}, { lastAssignedTeacher: selectedTeacher?._id }, { new: true });

    return selectedTeacher?._id;
}

export const generateOTP = (): number => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

export const encryptOTP = (otp: number): string => {
    const encryptOTP = crypto.createHash('sha256').update(otp.toString()).digest('hex');
    return encryptOTP;
}

export const getFiveMinExpiryTime = (): Date => {
    return new Date(Date.now() + 5 * 60 * 1000);
}

export const formatDate = (date: string): Date => {
    const [day, month, year] = date.split("-").map(Number);

    // const parsedFollowUpDate = new Date(year as number, month as number - 1, day);

    // return parsedFollowUpDate;

    return new Date(Date.UTC(year as number, month as number - 1, day));
}