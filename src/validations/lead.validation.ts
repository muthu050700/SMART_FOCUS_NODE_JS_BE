import z, { email, string } from "zod"
import { DEFAULT_LEAD_SOURCE, EMAIL_VALIDATION_MESSAGE, FIRST_NAME_MAX_ERROR_MESSAGE, FIRST_NAME_MIN_ERROR_MESSAGE, LAST_NAME_MAX_ERROR_MESSAGE, LAST_NAME_MIN_ERROR_MESSAGE, LEAD_SOURCE, LEAD_SOURCE_VALIDATION_MESSAGE, LEAD_STATUS, LEAD_STATUS_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_MESSAGE, PHONE_NO_VALIDATION_REGEX, USER_ROLES } from "../utils/constant.js"
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createLeadSchema = z.object({
    firstName: z.string().min(3, FIRST_NAME_MIN_ERROR_MESSAGE).max(50, FIRST_NAME_MAX_ERROR_MESSAGE).trim(),
    lastName: z.string().min(1, LAST_NAME_MIN_ERROR_MESSAGE).max(50, LAST_NAME_MAX_ERROR_MESSAGE).trim(),
    phoneNo: z.string().regex(PHONE_NO_VALIDATION_REGEX, PHONE_NO_VALIDATION_MESSAGE).trim(),
    email: z.string().toLowerCase().trim().email(EMAIL_VALIDATION_MESSAGE),
    role: z.enum(USER_ROLES),
    course: z.string().trim().min(1),
    otpVerified: z.boolean().optional().default(false),
    status: z.enum(LEAD_STATUS, { message: LEAD_STATUS_VALIDATION_MESSAGE }),
    notes: z.array(z.object({
        message: z.string(),
        createdAt: z.date().optional().default(() => new Date())
    })).optional().default([]),
    assignedCounsellor: z.string().optional().default(""),
    followUpDate: z.coerce.date().optional().default(() => new Date()),
    source: z.enum(LEAD_SOURCE, { message: LEAD_SOURCE_VALIDATION_MESSAGE }).optional().default(DEFAULT_LEAD_SOURCE)
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;