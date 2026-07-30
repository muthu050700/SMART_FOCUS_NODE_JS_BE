import { Types } from "mongoose";
import { LeadModel } from "../models/lead.model.js";
import { EMAIL_VALIDATION_MESSAGE, OTP_VALIDATION_SUBJECT_FOR_EMAIL, USER_ALREADY_EXITS_VALIDATION_MESSAGE, USER_DATA_BODY_VALIDATION_MESSAGE } from "../utils/constant.js";
import { isEmailIdValid, isReqBodyExitsFn, getUser, generateOTP, encryptOTP, getFiveMinExpiryTime } from "../utils/helperFunctions.js";
import type { CreateLeadInput } from "../validations/lead.validation.js";
import sendEmailService from "./sendEmail.service.js";
import { getEmailOTPVerificationContent } from "../utils/OTPVerification/getEmailVerificationContent.js";

const createLeadService = async (body: CreateLeadInput) => {
    // Validation Body is available or not
    const isReqBodyExits: boolean = isReqBodyExitsFn(body);
    if (isReqBodyExits) throw new Error(USER_DATA_BODY_VALIDATION_MESSAGE)

    const { firstName, lastName, email, assignedCounsellor, ...rest } = body;

    //validating email is valid or not
    const isEmailIdInvalid: boolean = isEmailIdValid(email);
    if (isEmailIdInvalid) throw new Error(EMAIL_VALIDATION_MESSAGE)

    // checking user already exits or not
    const userObj = await getUser(email, LeadModel);
    if (!!userObj) throw new Error(USER_ALREADY_EXITS_VALIDATION_MESSAGE);

    //Generate OTP 
    const otp: number = generateOTP();
    const encryptedOTP = encryptOTP(otp);
    const expiredAt = getFiveMinExpiryTime();

    //Save Lead to the database
    const lead = await LeadModel.create({
        ...rest,
        firstName, lastName, email,
        assignedCounsellor: assignedCounsellor
            ? new Types.ObjectId(assignedCounsellor)
            : undefined,
        otp: encryptedOTP,
        otpExpiresAt: expiredAt
    });

    const { _id } = lead;

    // Sending Email OTP to user
    const emailOTPVerificationContnet = getEmailOTPVerificationContent(otp, firstName, lastName);
    const subject = OTP_VALIDATION_SUBJECT_FOR_EMAIL;

    // config for email sending
    await sendEmailService(email, subject, emailOTPVerificationContnet);

    return { leadId: _id };
}

export default createLeadService;