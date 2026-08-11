import z from "zod";
import { LEAD_STATUS } from "../utils/constant.js";

const leadStatusValidation = z.object({
    status: z.enum(LEAD_STATUS),
    remark: z.string().trim(),
});
export type LeadStatusValidation = z.infer<typeof leadStatusValidation>