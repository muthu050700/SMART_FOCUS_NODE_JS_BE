import z from "zod";

const updateLeadNotesValidation = z.object({
    message: z.string().trim()
});

export type UpdateLeadNotesValidation = z.infer<typeof updateLeadNotesValidation>;