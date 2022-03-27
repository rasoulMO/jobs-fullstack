import express from "express";
import {getAllProjects, getProjectById, addJobToProject, createNewProject} from "../controllers/project.controller";
const projectsRouter = express.Router();


// @route GET && POST - /projects/
projectsRouter.route("/").get(getAllProjects)

projectsRouter.route("/:id").get(getProjectById);

projectsRouter.route("/add-job/:id").post(addJobToProject);

projectsRouter.route("/").post(createNewProject);

export {projectsRouter};