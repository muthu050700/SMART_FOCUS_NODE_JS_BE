import User from "../models/user.model.js";
import { EMAIL_VALIDATION_MESSAGE, PASSWORD_VALIDATION_MESSAGE, USER_DATA_BODY_VALIDATION_MESSAGE, USER_NOT_FOUND } from "../utils/constant.js";
import { generateJWTToken, isEmailIdValid, isPasswordMatchFn, isPasswordValidCheck, isReqBodyExitsFn, isUserAlreadyLoggedIn } from "../utils/helperFunctions.js";
import type { LoginValidation } from "../validations/login.validation.js";
import { Types } from "mongoose";

interface Iuser {
    _id: Types.ObjectId,
    role: string
}

const authUserLoginService = async (body: LoginValidation): Promise<string> => {
    //validating wheather body exits or not
    const isBodyExits: boolean = isReqBodyExitsFn(body);
    if (isBodyExits) throw new Error(USER_DATA_BODY_VALIDATION_MESSAGE);

    //Getting Email and Password
    const { email, password } = body;

    //Email validation 
    const isEmailIdInvalid: boolean = isEmailIdValid(email);
    if (isEmailIdInvalid) throw new Error(EMAIL_VALIDATION_MESSAGE);

    //Password validation
    const isPasswordValid: boolean = isPasswordValidCheck(password);
    if (isPasswordValid) throw new Error(PASSWORD_VALIDATION_MESSAGE);

    //checking user already exits or not
    const user = await isUserAlreadyLoggedIn(email, User);
    if (!user) throw new Error(USER_NOT_FOUND);

    //getting DB password
    const dbPassword: string = user?.password;
    const { _id, role }: Iuser = user;

    //validating password is matching or not
    const isPasswordMatch: boolean = await isPasswordMatchFn(password, dbPassword);
    if (isPasswordMatch) throw new Error(PASSWORD_VALIDATION_MESSAGE);

    //Generate JWT Token
    const token = generateJWTToken(_id.toString(), role);
    return token;
}

export default authUserLoginService;