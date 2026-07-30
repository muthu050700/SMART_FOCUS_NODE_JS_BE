import { LeadModel } from "../models/lead.model.js";
import { LEAD_ID_IS_REQUIRED_MESSAGE, OTP_ALREADY_VERIVIED_VALIDATION_MESSAGE, OTP_VALIDATION_SUBJECT_FOR_EMAIL, USER_NOT_FOUND } from "../utils/constant.js";
import { encryptOTP, generateOTP, getFiveMinExpiryTime } from "../utils/helperFunctions.js";
import { getEmailOTPVerificationContent } from "../utils/OTPVerification/getEmailVerificationContent.js";
import type { ReSendOtpValidation } from "../validations/reSendOtp.validation.js";
import sendEmailService from "./sendEmail.service.js";

interface LeadUser {
    email: string,
    firstName: string,
    lastName: string
}

const reSendOtpService = async (body: ReSendOtpValidation) => {
    const { leadId } = body;

    //Checking leadId is exist in payload
    if (!leadId) throw new Error((LEAD_ID_IS_REQUIRED_MESSAGE as string));

    //Get lead user
    const leadUser = await LeadModel.findById({ _id: leadId });
    // const email: string = leadUser?.email ?? "";
    if (!leadUser) throw new Error(USER_NOT_FOUND);

    const { email, firstName, lastName }: LeadUser = leadUser;

    // Checking if lead user is already otp is verified
    const isLeadUserAlreadyVerified = leadUser?.otpVerified;
    if (isLeadUserAlreadyVerified) throw new Error(OTP_ALREADY_VERIVIED_VALIDATION_MESSAGE);

    //Creating a six digit otp number
    const otp: number = generateOTP();
    //encrypting the otp
    const encryptedOTP = encryptOTP(otp);
    //otp expiry time
    const expiredAt = getFiveMinExpiryTime();

    //saving the otp and expiry time for lead user
    await LeadModel.findByIdAndUpdate({ _id: leadId }, {
        otp: encryptedOTP,
        otpExpiresAt: expiredAt
    });

    // Sending Email OTP to user
    const emailOTPVerificationContnet = getEmailOTPVerificationContent(otp, firstName, lastName);
    const subject = OTP_VALIDATION_SUBJECT_FOR_EMAIL;

    // config for email sending
    await sendEmailService(email, subject, emailOTPVerificationContnet);

    return { leadId };
}

export default reSendOtpService;