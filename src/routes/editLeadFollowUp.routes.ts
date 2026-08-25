import express from "express";
import editLeadFollowUpController from "../controllers/editLeadFollowUp.controller.js";
import userAuth from "../middleware/auth.js";

const editLeadFollowUpRoute = express.Router();

editLeadFollowUpRoute.patch("/:leadId/:followUpId", userAuth, editLeadFollowUpController);

export default editLeadFollowUpRoute;