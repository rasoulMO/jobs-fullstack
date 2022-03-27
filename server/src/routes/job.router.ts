import express from "express";
import {getAllJobs, getJobById, getJobsByStatus, getAllJobsByCreatedAt, updateJobStatus} from "../controllers/job.controller";
const jobsRouter = express.Router();


// @route GET && POST - /jobs/
jobsRouter.route("/").get(getAllJobs)

jobsRouter.route("/:id").get(getJobById);

jobsRouter.route("/by-status/:id").get(getJobsByStatus);

// TODO: CHECK IF THIS IS CORRECT
jobsRouter.route("/by-created-at").get(getAllJobsByCreatedAt);

jobsRouter.route("/update-status").put(updateJobStatus);

// jobsRouter.route("/create").post(createJob);

export {jobsRouter};