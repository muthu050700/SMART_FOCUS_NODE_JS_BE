import dotenv from "dotenv";

dotenv.config();

//ENV
export const MONGO_DB_URL = process.env.MONGO_DB_URL ?? "";
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET ?? "";

export type USER_ROLE_TYPE = "admin" | "student" | "teacher" | "parent";
export type LEAD_FOLLOW_UP_MODE = "CALL" | "EMAIL" | "WHATSAPP" | "MEETING";
export const USER_ROLES = ["admin", "teacher", "student", "parent"] as const;
export const ROLE_DEFAULT_VALUE = "student";
export type LEAD_USER_STATUS = typeof LEAD_STATUS[number];
export const LEAD_STATUS = ["NEW", "CONTACTED", "INTERESTED", "ADMISSION_PROCESS", "CONVERTED", "LOST"] as const;
export const DEFAULT_LEAD_STATUS = "NEW";
export const LEAD_SOURCE = ["WEBSITE", "WHATSAPP", "INSTAGRAM", "WALK_IN"] as const;
export const DEFAULT_LEAD_SOURCE = "WEBSITE";
export const DEFAULT_LEAD_FOLLOW_UP = "CALL";
export const FOLLOW_UP_MODES = ["CALL", "EMAIL", "WHATSAPP", "MEETING"];
export const LEAD_STATUS_ALLOWED_TRANSACTIONS: Record<string, string[]> = {
    NEW: ["CONTACTED", "LOST"],
    CONTACTED: ["INTERESTED", "LOST"],
    INTERESTED: ["ADMISSION_PROCESS", "LOST"],
    ADMISSION_PROCESS: ["CONVERTED", "LOST"],
    CONVERTED: [],
    LOST: []
}

//validation messages
export const EMAIL_VALIDATION_MESSAGE: string = "Invalid credentials";
export const PHONE_NO_VALIDATION_MESSAGE: string = "Phone No is not valid";
export const ROLE_VALIDATION_MESSAGE: string = "Role is not valid";
export const LEAD_STATUS_VALIDATION_MESSAGE: string = "Status is not valid";
export const LEAD_SOURCE_VALIDATION_MESSAGE: string = "Source is not valid";
export const USER_DATA_BODY_VALIDATION_MESSAGE: string = "Request body is required";
export const USER_ALREADY_EXITS_VALIDATION_MESSAGE: string = "User already Exits";
export const SAVE_SUCCESS_MESSAGE: string = "saved successfully";
export const VALIDATION_FAILED_MESSAGE: string = "Validation failed";
export const INTERNAL_ERROR_MESSAGE: string = "Internal server error";
export const PASSWORD_VALIDATION_MESSAGE: string = "Invalid credentials";
export const FIRST_NAME_MIN_ERROR_MESSAGE: string = "First name must be at least 3 characters";
export const LAST_NAME_MIN_ERROR_MESSAGE: string = "Last name must be at least 3 characters";
export const FIRST_NAME_MAX_ERROR_MESSAGE: string = "First name must be less than 50 characters";
export const LAST_NAME_MAX_ERROR_MESSAGE: string = "Last name must be less than 50 characters";
export const LOGIN_SUCCESSFULL_MESSAGE: string = "Login Successfull";
export const USER_NOT_FOUND: string = "User not found";
export const TOKEN_VALIDATION_MESSAGE: string = "Please Login again!!!";
export const OTP_VALIDATION_SUBJECT_FOR_EMAIL: string = "Verify Your Email Address – Smart Focus Tuition Center";
export const OTP_VALIDATION_FORMAT: string = "gmail";
export const TUTION_CENTER_NAME: string = "Smart Focus Tuition Center";
export const OTP_GENERARED_SUCCESS_MESSAGE: string = "OTP Generated Successfully";
export const LEAD_ID_IS_REQUIRED_MESSAGE: String = "Lead ID is required";
export const OTP_EXPIRED_MESSAGE: string = "OTP is Expired.";
export const OTP_ATTMENT_EXCEED_MESSAGE: string = "Maximum OTP attempts exceeded. Please request a new OTP.";
export const OTP_NOT_VALID_MESSAGE: string = "OTP is Not valided";
export const OTP_SUCCESS_MESSAGE: string = "OTP Successfully Verified!";
export const RESEND_OTP_SUCCESS_MESSAGE: string = "OTP resent successfully.";
export const LEAD_STATUS_UPDATED_SUCCESS_MESSAGE: string = "Status updated successfully.";
export const OTP_ALREADY_VERIVIED_VALIDATION_MESSAGE: string = "Already a verified user.";
export const LEAD_ID_REQUIRED_MESSAGE = "Lead ID is required.";
export const STATUS_REQUIRED_MESSAGE = "Status is required.";
export const REMART_REQUIRED_MESSAGE = "Remark is required.";
export const LEAD_NOTES_SUCCESS_MESSAGE = "Notes updated Successfully.";
export const INVALID_REQUEST = "Invalid Request";
export const MESSAGE_IS_REQUIRED = "Message is Required";

//regex
export const EMAIL_VALIDATION_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_VALIDATION_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const PHONE_NO_VALIDATION_REGEX: RegExp = /^[6-9]\d{9}$/;

//Status Code
export const SUCCESS_STATUS_CODE: number = 201;

//Password Salt Rounds
export const PASSWORD_SALT_ROUNDS: number = 10;

//OTP Salt Rounds
export const OTP_SALT_ROUNDS: number = 10;

//OTP Maximun attempt
export const OTP_MAX_ATTEMPTS = 5;
