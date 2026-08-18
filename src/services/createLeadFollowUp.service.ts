import { LeadModel } from "../models/lead.model.js";
import { INVALID_REQUEST } from "../utils/constant.js";
import { formatDate } from "../utils/helperFunctions.js";
import type { LeadFollowUpValidation } from "../validations/createLeadFollowUps.validation.js";

const createLeadFollowUpService = async (body: LeadFollowUpValidation, leadId: string, userId: string) => {
    const createdBy = userId;

    const { followUpDate, mode, remark, completed } = body;

    //check wheather body is exits or not
    if (!followUpDate || !mode || !remark || !completed) throw new Error(INVALID_REQUEST);

    //Check lead user id is there or not
    if (!leadId) throw new Error(INVALID_REQUEST);

    //Get lead user 
    const leadUser = await LeadModel.findById({ _id: leadId });

    //Formating the date
    const parsedFollowUpDate = formatDate(followUpDate as string);

    leadUser?.followUps.push({ followUpDate: parsedFollowUpDate, mode, remark, completed, createdBy });

    await leadUser?.save();
}

export default createLeadFollowUpService;