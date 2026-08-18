import express from "express";
import createLeadNotesController from "../controllers/createLeadNotes.controller.js";
import userAuth from "../middleware/auth.js";

const createLeadNotesRoute = express.Router();

createLeadNotesRoute.post("/:id/notes", userAuth, createLeadNotesController);

export default createLeadNotesRoute;    