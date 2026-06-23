import dotenv from "dotenv";

dotenv.config();

//ENV
export const MONGO_DB_URL = process.env.MONGO_DB_URL ?? "";
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET ?? "";

export type USER_ROLE_TYPE = "admin" | "student" | "teacher" | "parent";
export const USER_ROLES = ["admin", "teacher", "student", "parent"] as const;
export const ROLE_DEFAULT_VALUE = "student";
export type LEAD_USER_STATUS = "NEW" | "CONTACTED" | "INTERESTED" | "CONVERTED" | "LOST";
export const LEAD_STATUS = ["NEW", "CONTACTED", "INTERESTED", "CONVERTED", "LOST"] as const;
export const DEFAULT_LEAD_STATUS = "NEW";
export const LEAD_SOURCE = ["WEBSITE", "WHATSAPP", "INSTAGRAM", "WALK_IN"] as const;
export const DEFAULT_LEAD_SOURCE = "WEBSITE";


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

//regex
export const EMAIL_VALIDATION_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_VALIDATION_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const PHONE_NO_VALIDATION_REGEX: RegExp = /^[6-9]\d{9}$/;

//Status Code
export const SUCCESS_STATUS_CODE: number = 201;

//Password Salt Rounds
export const PASSWORD_SALT_ROUNDS: number = 10;