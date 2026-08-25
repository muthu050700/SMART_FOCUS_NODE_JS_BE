import { LeadModel } from "../models/lead.model.js";
import { INVALID_REQUEST, USER_NOT_FOUND } from "../utils/constant.js";
import { formatDate } from "../utils/helperFunctions.js";
import type { EditFollowUpValidation } from "../validations/editLeadFollowUp.validation.js";

const editLeadFollowUpService = async (body: EditFollowUpValidation, leadId: string, followUpId: string, userId: string) => {
    if (Object.keys(body ?? {}).length <= 0) throw new Error(INVALID_REQUEST);

    if (!followUpId) throw new Error(INVALID_REQUEST);

    if (!leadId) throw new Error(INVALID_REQUEST);

    const updatedData: Record<string, unknown> = {};

    if (body?.followUpDate !== undefined) {
        const parsedFollowUpDate = formatDate(body?.followUpDate as string);
        updatedData["followUps.$.followUpDate"] = parsedFollowUpDate;
    }

    if (body?.mode !== undefined) {
        updatedData["followUps.$.mode"] = body?.mode;
    }

    if (body?.remark !== undefined) {
        updatedData["followUps.$.remark"] = body?.remark;
    }

    if (body?.completed !== undefined) {
        updatedData["followUps.$.completed"] = body?.completed;
    }

    await LeadModel.findOneAndUpdate(
        {
            _id: leadId,
            "followUps._id": followUpId,
        },
        {
            $set: updatedData,
        },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
}

export default editLeadFollowUpService;