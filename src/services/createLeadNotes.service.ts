import { LeadModel } from "../models/lead.model.js";
import { INVALID_REQUEST, MESSAGE_IS_REQUIRED, USER_NOT_FOUND } from "../utils/constant.js";
import type { UpdateLeadNotesValidation } from "../validations/updateLeadNotes.validation.js";

const createLeadNotesService = async (body: UpdateLeadNotesValidation, leadId: string, loggedUserId: string) => {
    //Checking Lead Id is there or not
    if (!leadId) throw new Error(INVALID_REQUEST);

    const { message } = body;

    //Checking message is there or not
    if (!message) throw new Error(MESSAGE_IS_REQUIRED);

    //Get Lead user
    const leadUser = await LeadModel.findById({ _id: leadId });

    if (!leadUser) throw new Error(USER_NOT_FOUND);

    leadUser.notes ??= [];

    leadUser.notes.push({
        message,
        createdBy: loggedUserId
    });

    await leadUser.save();
}

export default createLeadNotesService;