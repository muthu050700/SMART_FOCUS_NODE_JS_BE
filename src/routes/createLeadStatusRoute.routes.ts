import express from "express";
import updateLeadStatusController from "../controllers/createLeadStatus.controller.js";

const createLeadStatusRoute = express.Router();

createLeadStatusRoute.patch("/:id/status", updateLeadStatusController);

export default createLeadStatusRoute;

