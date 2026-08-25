import { LeadModel } from "../models/lead.model.js";
import { INVALID_REQUEST, LEAD_ID_REQUIRED_MESSAGE, LEAD_STATUS_ALLOWED_TRANSACTIONS, REMART_REQUIRED_MESSAGE, STATUS_REQUIRED_MESSAGE, USER_NOT_FOUND, type LEAD_USER_STATUS } from "../utils/constant.js";
import type { LeadStatusValidation } from "../validations/updateLeadStatus.validation.js";


const createLeadStatusService = async (body: LeadStatusValidation, leadId: string) => {
    //Checking LeadId is there are not

    if (!leadId) throw new Error(INVALID_REQUEST);

    const { status, remark } = body;

    if (!status) throw new Error(STATUS_REQUIRED_MESSAGE);

    if (!remark) throw new Error(REMART_REQUIRED_MESSAGE);

    const leadUser = await LeadModel.findById({ _id: leadId });

    if (!leadUser) throw new Error(USER_NOT_FOUND);

    const currentStatus = leadUser?.status;
    console.log(currentStatus, "currentStatus")
    console.log(status, "status")
    const isAllowed_Transaction_Not_Valid = ((LEAD_STATUS_ALLOWED_TRANSACTIONS ?? {})[currentStatus])?.includes(status);
    console.log(isAllowed_Transaction_Not_Valid, "isAllowed_Transaction_Not_Valid")
    if (!isAllowed_Transaction_Not_Valid) throw new Error(`Invalid status transition`);

    leadUser.status = status;

    leadUser.statusHistory.push({
        status,
        remark
    });

    await leadUser.save();
}

export default createLeadStatusService;