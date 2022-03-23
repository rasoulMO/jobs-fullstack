import express from "express";
const {getAllProjects, getProjectById, addJobToProject, createNewProject} = require("../controllers/project.controllers");
const router = express.Router();


// @route GET && POST - /projects/
router.route("/").get(getAllProjects)

router.route("/:id").get(getProjectById);

router.route("/add-job/:id").post(addJobToProject);

router.route("/create").post(createNewProject);

module.exports = router;