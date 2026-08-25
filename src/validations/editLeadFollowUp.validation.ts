import z from "zod";
import { FOLLOW_UP_MODES } from "../utils/constant.js";

const editLeadFollowUpValidation = z.object({
    "followUpDate": z.string().optional(),
    "mode": z.enum(FOLLOW_UP_MODES).optional(),
    "remark": z.string().trim().optional(),
    "completed": z.boolean().default(false).optional(),
});

export type EditFollowUpValidation = z.infer<typeof editLeadFollowUpValidation>;