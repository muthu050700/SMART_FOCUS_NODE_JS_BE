import { LeadModel } from "../models/lead.model.js";
import { INVALID_REQUEST, LEAD_ID_REQUIRED_MESSAGE, REMART_REQUIRED_MESSAGE, STATUS_REQUIRED_MESSAGE, USER_NOT_FOUND, type LEAD_USER_STATUS } from "../utils/constant.js";
import type { LeadStatusValidation } from "../validations/updateLeadStatus.validation.js";


const updateLeadStatusService = async (body: LeadStatusValidation, leadId: string) => {
    //Checking LeadId is there are not

    if (!leadId) throw new Error(INVALID_REQUEST);

    const { status, remark } = body;

    if (!status) throw new Error(STATUS_REQUIRED_MESSAGE);

    if (!remark) throw new Error(REMART_REQUIRED_MESSAGE);

    const leadUser = await LeadModel.findById({ _id: leadId });

    if (!leadUser) throw new Error(USER_NOT_FOUND);

    leadUser.status = status;

    leadUser.statusHistory.push({
        status,
        remark
    })

    await leadUser.save();
}

export default updateLeadStatusService;