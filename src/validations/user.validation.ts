import { z } from "zod";
import { EMAIL_VALIDATION_MESSAGE, FIRST_NAME_MAX_ERROR_MESSAGE, FIRST_NAME_MIN_ERROR_MESSAGE, PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALIDATION_REGEX, PHONE_NO_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_REGEX, ROLE_DEFAULT_VALUE, ROLE_VALIDATION_MESSAGE, USER_ROLES } from "../utils/constant.js";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createUserSchema = z.object({
    firstName: z.string().max(50, FIRST_NAME_MAX_ERROR_MESSAGE).min(3, FIRST_NAME_MIN_ERROR_MESSAGE).trim().openapi({ example: "String" }),
    lastName: z.string().min(1, FIRST_NAME_MIN_ERROR_MESSAGE).max(50, FIRST_NAME_MAX_ERROR_MESSAGE).trim().openapi({ example: "String" }),
    email: z.string().email(EMAIL_VALIDATION_MESSAGE).toLowerCase().trim().openapi({ example: "String" }),
    password: z.string().min(8).regex(PASSWORD_VALIDATION_REGEX, PASSWORD_VALIDATION_MESSAGE).trim().openapi({ example: "String" }),
    phoneNo: z.string().regex(PHONE_NO_VALIDATION_REGEX, PHONE_NO_VALIDATION_MESSAGE).trim().openapi({ example: "Number" }),
    role: z.enum(USER_ROLES, { message: ROLE_VALIDATION_MESSAGE }).default(ROLE_DEFAULT_VALUE).openapi({ example: "String" })
});

export type CreateUserInput = z.infer<typeof createUserSchema>;