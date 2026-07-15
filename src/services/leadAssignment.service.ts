import type mongoose from "mongoose";
import { LeadAssignmentModel } from "../models/leadAssignmentSettings.js"
import User from "../models/user.model.js";
import { assignCounsellor } from "../utils/helperFunctions.js";

export const leadAssignmentService = async () => {
    //Checking Counsellor is exits or not
    const lastSelectedCounsellor = await LeadAssignmentModel.findOne();

    // Get All Teacher List
    const teachersList = await User.find({ role: "teacher" }).sort({ _id: 1 });

    //Throw Error If teacher list empty
    if (teachersList.length === 0) throw new Error("Teacher Not Found.");

    //If there is no counsellor then we are creating a new counsellor data
    if (!lastSelectedCounsellor) {
        const selectedTeacherId = assignCounsellor(teachersList, "create", 0);
        console.log(selectedTeacherId, "selectedTeacherId")
        return selectedTeacherId;
    }

    //Finding last counsellor / teacher index
    const lastTeacherIndex = (teachersList ?? []).findIndex((list) => (list._id).equals(lastSelectedCounsellor.lastAssignedTeacher));

    //If last counsellor is the last data then we are again starting from 0 index
    if (lastTeacherIndex === teachersList.length - 1) {
        const selectedTeacherId = assignCounsellor(teachersList, "update", 0);
        console.log(selectedTeacherId, "selectedTeacherId")
        return selectedTeacherId;
    }

    // Getting new Teacher / counsellor index
    const newTeacherIndex = lastTeacherIndex + 1;
    const selectedTeacherId = await assignCounsellor(teachersList, "update", newTeacherIndex);
    console.log(selectedTeacherId, "selectedTeacherId")
    return selectedTeacherId;
}