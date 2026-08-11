import express from "express";
import updateLeadNotesController from "../controllers/updateLeadNotes.controller.js";

const updateLeadNotesRoute = express.Router();

updateLeadNotesRoute.post("/:id/notes", updateLeadNotesController);

export default updateLeadNotesRoute;    