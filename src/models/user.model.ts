import mongoose, { Document } from "mongoose"
import { EMAIL_VALIDATION_MESSAGE, PASSWORD_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_MESSAGE, ROLE_DEFAULT_VALUE, ROLE_VALIDATION_MESSAGE, USER_ROLES, type USER_ROLE_TYPE } from "../utils/constant.js";
import validator from "validator";

interface User extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNo: string,
    role: USER_ROLE_TYPE
}

const userSchema = new mongoose.Schema<User>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: EMAIL_VALIDATION_MESSAGE
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            select: false,
            validate: {
                validator: (value: string) => validator.isStrongPassword(value),
                message: PASSWORD_VALIDATION_MESSAGE
            }
        },
        phoneNo: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => validator.isMobilePhone(value, "en-IN"),
                message: PHONE_NO_VALIDATION_MESSAGE
            }
        },
        role: {
            type: String,
            required: true,
            enum: { values: USER_ROLES, message: ROLE_VALIDATION_MESSAGE },
            default: ROLE_DEFAULT_VALUE
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<User>("User", userSchema);

export default User;