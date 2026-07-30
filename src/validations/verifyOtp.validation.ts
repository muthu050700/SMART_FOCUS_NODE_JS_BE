import z, { email } from "zod";
import { EMAIL_VALIDATION_MESSAGE } from "../utils/constant.js";

const verifyOtpValidation = z.object({
    leadId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    leadOtp: z.number()
});

export type VerifyOtpValidation = z.infer<typeof verifyOtpValidation>