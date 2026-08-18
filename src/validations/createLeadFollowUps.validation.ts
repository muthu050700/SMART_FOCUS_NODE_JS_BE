import z from "zod";
import { FOLLOW_UP_MODES } from "../utils/constant.js";

const leadFollowUpValidation = z.object({
    "followUpDate": z.string(),
    "mode": z.enum(FOLLOW_UP_MODES),
    "remark": z.string().trim(),
    "completed": z.boolean().default(false),
});

export type LeadFollowUpValidation = z.infer<typeof leadFollowUpValidation>