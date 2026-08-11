import express from "express";
import updateLeadStatusController from "../controllers/updateLeadStatus.controller.js";

const updateLeadStatusRoute = express.Router();

updateLeadStatusRoute.patch("/:id/status", updateLeadStatusController);

export default updateLeadStatusRoute;

