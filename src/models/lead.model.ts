import mongoose, { Schema, Document, model, Types } from "mongoose";
import validator from "validator";
import { DEFAULT_LEAD_SOURCE, DEFAULT_LEAD_STATUS, EMAIL_VALIDATION_MESSAGE, LEAD_SOURCE, LEAD_SOURCE_VALIDATION_MESSAGE, LEAD_STATUS, LEAD_STATUS_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_MESSAGE, ROLE_DEFAULT_VALUE, ROLE_VALIDATION_MESSAGE, USER_ROLES, type LEAD_USER_STATUS } from "../utils/constant.js";
interface leadNotes {
    message: string,
    creadtedAt?: Date
}

type LeadSource = typeof LEAD_SOURCE[number];

export interface LeadUser extends Document {
    firstName: string,
    lastName: string,
    phoneNo: string,
    email: string,
    role: string,
    course: string,
    otpVerified?: boolean,
    status: LEAD_USER_STATUS,
    notes?: Array<leadNotes>,
    assignedCounsellor?: Types.ObjectId,
    followUpDate?: Date,
    source?: LeadSource
}

const leadSchema = new Schema<LeadUser>(
    {
        firstName: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 50,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: 50,
            required: true
        },
        phoneNo: {
            type: String,
            validate: {
                validator: (value: string) => validator.isMobilePhone(value, "en-IN"),
                message: PHONE_NO_VALIDATION_MESSAGE
            },
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: EMAIL_VALIDATION_MESSAGE
            },
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: { values: USER_ROLES, message: ROLE_VALIDATION_MESSAGE },
            default: ROLE_DEFAULT_VALUE
        },
        course: {
            type: String,
            required: true,
            trim: true,
        },
        otpVerified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            trim: true,
            enum: { values: LEAD_STATUS, message: LEAD_STATUS_VALIDATION_MESSAGE },
            default: DEFAULT_LEAD_STATUS
        },
        notes: [
            {
                message: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        assignedCounsellor: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        followUpDate: Date,
        source: {
            type: String,
            enum: { values: LEAD_SOURCE, message: LEAD_SOURCE_VALIDATION_MESSAGE },
            default: "WEBSITE"
        }
    },
    {
        timestamps: true,
    }
);

export const LeadModel = model<LeadUser>("LeadModel", leadSchema);