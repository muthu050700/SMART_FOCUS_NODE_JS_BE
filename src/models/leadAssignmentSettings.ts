import mongoose, { Document } from "mongoose";
import User from "./user.model.js";


export interface LeadAssignment extends Document {
    lastAssignedTeacher: mongoose.Types.ObjectId
}

const leadAssignmentSettingsSchema = new mongoose.Schema({
    lastAssignedTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: User
    }
});

export const LeadAssignmentModel = mongoose.model<LeadAssignment>("LeadAssignmentModel", leadAssignmentSettingsSchema)