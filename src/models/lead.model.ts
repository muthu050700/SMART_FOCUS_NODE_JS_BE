import mongoose, { Schema, Document, model, Types } from "mongoose";
import validator from "validator";
import { DEFAULT_LEAD_SOURCE, FOLLOW_UP_MODES, DEFAULT_LEAD_STATUS, EMAIL_VALIDATION_MESSAGE, LEAD_SOURCE, LEAD_SOURCE_VALIDATION_MESSAGE, LEAD_STATUS, LEAD_STATUS_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_MESSAGE, ROLE_DEFAULT_VALUE, ROLE_VALIDATION_MESSAGE, USER_ROLES, type LEAD_USER_STATUS, type LEAD_FOLLOW_UP_MODE, DEFAULT_LEAD_FOLLOW_UP } from "../utils/constant.js";

interface leadNotes {
    message: string,
    creadtedAt?: Date,
    createdBy: string
}

interface leadFollowUp {
    followUpDate: Date,
    mode: string,
    remark: string,
    completed: boolean,
    createdBy: string,
    createdAt?: Date
}

interface statusHistory {
    status: LEAD_USER_STATUS,
    remark: string,
    updatedBy?: Types.ObjectId,
    createdAt?: Date
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
    statusHistory: Array<statusHistory>,
    contactCount: number,
    lastContactedAt: Date,
    notes?: Array<leadNotes>,
    assignedCounsellor?: Types.ObjectId | undefined,
    // followUpDate?: Date,
    followUps: Array<leadFollowUp>,
    source?: LeadSource,
    otp: string | null,
    otpExpiresAt: Date | null,
    otpAttempts: number,
    reSendOtpAttempts: number
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
        otp: {
            type: String,
            default: null
        },
        otpExpiresAt: {
            type: Date,
            default: null
        },
        otpAttempts: {
            type: Number,
            default: 0
        },
        reSendOtpAttempts: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            trim: true,
            enum: { values: LEAD_STATUS, message: LEAD_STATUS_VALIDATION_MESSAGE },
            default: DEFAULT_LEAD_STATUS
        },
        statusHistory: [
            {
                status: {
                    type: String,
                    enum: LEAD_STATUS
                },
                remark: String,
                updatedBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        notes: [
            {
                message: {
                    type: String,
                    required: true
                },
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        assignedCounsellor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        // followUpDate: Date,
        followUps: [
            {
                followUpDate: {
                    type: Date,
                    required: true
                },
                mode: {
                    type: String,
                    enum: FOLLOW_UP_MODES,
                    default: DEFAULT_LEAD_FOLLOW_UP
                },
                remark: String,
                completed: {
                    type: Boolean,
                    default: false,
                },
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        contactCount: {
            type: Number,
            default: 0
        },
        lastContactedAt: {
            type: Date,
        },
        source: {
            type: String,
            enum: { values: LEAD_SOURCE, message: LEAD_SOURCE_VALIDATION_MESSAGE },
            default: DEFAULT_LEAD_SOURCE
        }
    },
    {
        timestamps: true,
    }
);

export const LeadModel = model<LeadUser>("LeadModel", leadSchema);