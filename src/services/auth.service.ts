import User from "../models/user.model.js";
import { EMAIL_VALIDATION_MESSAGE, PASSWORD_VALIDATION_MESSAGE, USER_ALREADY_EXITS_VALIDATION_MESSAGE, USER_DATA_BODY_VALIDATION_MESSAGE } from "../utils/constant.js";
import { isEmailIdValid, isPasswordValidCheck, isReqBodyExitsFn, isUserAlreadyLoggedIn, passwordHashFn } from "../utils/helperFunctions.js";
import type { CreateUserInput } from "../validations/user.validation.js";

export const createUserService = async (body: CreateUserInput) => {
    //Validation wheather body exits or not
    const isReqBodyExits: boolean = isReqBodyExitsFn(body);
    if (isReqBodyExits) throw new Error(USER_DATA_BODY_VALIDATION_MESSAGE);

    //Getting Email and Password
    const { email, password } = body;

    //Email validation 
    const isEmailIdInvalid: boolean = isEmailIdValid(email);
    if (isEmailIdInvalid) throw new Error(EMAIL_VALIDATION_MESSAGE);

    //checking user already exits or not
    const userObj = await isUserAlreadyLoggedIn(email, User);
    if (!!userObj) throw new Error(USER_ALREADY_EXITS_VALIDATION_MESSAGE);

    //Password validation
    const isPasswordValid: boolean = isPasswordValidCheck(password);
    if (isPasswordValid) throw new Error(PASSWORD_VALIDATION_MESSAGE);

    //PasswordHash 
    const hashedPassword: string = await passwordHashFn(password);

    // Updated Data for hashed Password
    const updateUserData = {
        ...body,
        password: hashedPassword
    }

    //Create user
    const createUser = async (data: CreateUserInput) => {
        return await User.create(data);
    }

    const user = await createUser(updateUserData);
    return user;
} 