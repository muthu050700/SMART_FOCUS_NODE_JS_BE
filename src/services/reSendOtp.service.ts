import { LeadModel } from "../models/lead.model.js";
import { LEAD_ID_IS_REQUIRED_MESSAGE, USER_NOT_FOUND } from "../utils/constant.js";
import type { ReSendOtpValidation } from "../validations/reSendOtp.validation.js";

const reSendOtpService = async (body: ReSendOtpValidation) => {
    const { leadId } = body;
    console.log(leadId, "leadId")
    //Checking leadId is exist in payload
    if (!leadId) throw new Error((LEAD_ID_IS_REQUIRED_MESSAGE as string));

    //Get lead user
    const leadUser = await LeadModel.findById({ _id: leadId });
    if (!leadUser) throw new Error(USER_NOT_FOUND);

    // Checking if lead user is already otp is verified
    const isLeadUserAlreadyVerified = leadUser?.otpVerified;
    if (isLeadUserAlreadyVerified) throw new Error("Already a verified user.")
}

export default reSendOtpService;