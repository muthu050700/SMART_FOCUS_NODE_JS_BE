import express from "express";
import createLeadFollowUps from "../controllers/createLeadFollowUp.controller.js";
import userAuth from "../middleware/auth.js";

const createLeadFollowUpRouter = express.Router();

createLeadFollowUpRouter.post("/:id/follow-ups", userAuth, createLeadFollowUps);

export default createLeadFollowUpRouter;