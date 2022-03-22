import express from "express";
const {getAllProjects, getProjectById, createNewProject} = require("../controllers/project.controllers");
const router = express.Router();


// @route GET && POST - /projects/
router.route("/").get(getAllProjects)

router.route("/:id").get(getProjectById);

router.route("/create").post(createNewProject);

module.exports = router;