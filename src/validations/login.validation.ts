import z from "zod";
import { EMAIL_VALIDATION_MESSAGE, PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALIDATION_REGEX } from "../utils/constant.js";

const loginValidationSchema = z.object({
    email: z.email(EMAIL_VALIDATION_MESSAGE).trim().toLowerCase().openapi({ example: "string" }),
    password: z.string().min(8).regex(PASSWORD_VALIDATION_REGEX, PASSWORD_VALIDATION_MESSAGE).trim().openapi({ example: "string" })
});

export type LoginValidation = z.infer<typeof loginValidationSchema>;