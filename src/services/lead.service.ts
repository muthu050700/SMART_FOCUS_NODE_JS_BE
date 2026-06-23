import { LeadModel } from "../models/lead.model.js";
import { EMAIL_VALIDATION_MESSAGE, USER_ALREADY_EXITS_VALIDATION_MESSAGE, USER_DATA_BODY_VALIDATION_MESSAGE } from "../utils/constant.js";
import { isEmailIdValid, isReqBodyExitsFn, getUser } from "../utils/helperFunctions.js";
import type { CreateLeadInput } from "../validations/lead.validation.js";

const createLeadService = async (body: CreateLeadInput) => {
    // Validation Body is available or not
    const isReqBodyExits: boolean = isReqBodyExitsFn(body);
    if (isReqBodyExits) throw new Error(USER_DATA_BODY_VALIDATION_MESSAGE)

    const { email } = body; //email

    //validating email is valid or not
    const isEmailIdInvalid: boolean = isEmailIdValid(email);
    if (isEmailIdInvalid) throw new Error(EMAIL_VALIDATION_MESSAGE)

    // checking user already exits or not
    const userObj = await getUser(email, LeadModel);
    if (!!userObj) throw new Error(USER_ALREADY_EXITS_VALIDATION_MESSAGE);

    const createLead = async (data: CreateLeadInput) => {
        return await LeadModel.create(data);
    }

    const lead = await createLead(body);

    return lead;
}

export default createLeadService;