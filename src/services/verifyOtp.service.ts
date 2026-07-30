import { LeadModel } from "../models/lead.model.js";
import { LEAD_ID_IS_REQUIRED_MESSAGE, OTP_ATTMENT_EXCEED_MESSAGE, OTP_EXPIRED_MESSAGE, OTP_MAX_ATTEMPTS, OTP_NOT_VALID_MESSAGE, USER_NOT_FOUND } from "../utils/constant.js";
import { encryptOTP } from "../utils/helperFunctions.js";
import type { VerifyOtpValidation } from "../validations/verifyOtp.validation.js";
import { leadAssignmentService } from "./leadAssignment.service.js";

const verifyOtpService = async (body: VerifyOtpValidation) => {
    const { leadId, leadOtp } = body;

    if (!leadId) throw new Error((LEAD_ID_IS_REQUIRED_MESSAGE as string));

    //Finfing the lead user in leadModel using id
    const leadUser = await LeadModel.findById({ _id: leadId });
    if (!leadUser) throw new Error(USER_NOT_FOUND as string);

    //Checking the otp is expired or not
    const isExpired = !leadUser?.otpExpiresAt || ((leadUser?.otpExpiresAt as Date) < new Date());
    if (isExpired) throw new Error(OTP_EXPIRED_MESSAGE as string);

    //validating maximum attempt
    const isMaximumAttemptReached = !(leadUser.otpAttempts < OTP_MAX_ATTEMPTS);
    if (isMaximumAttemptReached) throw new Error(OTP_ATTMENT_EXCEED_MESSAGE);

    //Checking the otp is valid or not
    const enteredOtpHash = encryptOTP(leadOtp);
    const savedOtpHash = leadUser?.otp as string;

    if (enteredOtpHash !== savedOtpHash) {
        await LeadModel.updateOne({ _id: leadId }, { $inc: { otpAttempts: 1 } });
        throw new Error(OTP_NOT_VALID_MESSAGE);
    }

    //Assign Lead Counsellor
    const selectedCounsellorId = await leadAssignmentService();

    Object.assign(leadUser, {
        otpAttempts: 0,
        otpExpiresAt: null,
        otpVerified: true,
        otp: null,
        assignedCounsellor: selectedCounsellorId
    });

    const verifiedLead = await leadUser.save();

    return {
        leadId: verifiedLead._id,
        firstName: verifiedLead.firstName,
        lastName: verifiedLead.lastName,
        email: verifiedLead.email,
        phoneNo: verifiedLead.phoneNo,
        otpVerified: verifiedLead.otpVerified,
        assignedCounsellor: verifiedLead.assignedCounsellor,
    };
}

export default verifyOtpService;