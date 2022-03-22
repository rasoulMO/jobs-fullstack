import express from "express";
const {getAllJobs, getJobById, getJobsByStatus,
	getAllJobsByCreatedAt, updateJobStatus, createJob} = require("../controllers/job.controllers");
const router = express.Router();


// @route GET && POST - /jobs/
router.route("/").get(getAllJobs)

router.route("/:id").get(getJobById);

router.route("/by-status/:id").get(getJobsByStatus);

// TODO: CHECK IF THIS IS CORRECT
router.route("/by-created-at").get(getAllJobsByCreatedAt);

router.route("/update-status").put(updateJobStatus);

router.route("/create").post(createJob);

module.exports = router;