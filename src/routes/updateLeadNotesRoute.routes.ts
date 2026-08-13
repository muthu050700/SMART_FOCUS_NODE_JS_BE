import express from "express";
import updateLeadNotesController from "../controllers/updateLeadNotes.controller.js";
import userAuth from "../middleware/auth.js";

const updateLeadNotesRoute = express.Router();

updateLeadNotesRoute.post("/:id/notes", userAuth, updateLeadNotesController);

export default updateLeadNotesRoute;    