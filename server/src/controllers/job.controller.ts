import {Job} from '../models/job.model';


// endpoint to get all jobs
const getAllJobs = async (req: any, res: any, next: any) => {
	try {
		let [jobs, _] = await Job.findAll();

		if (Array.isArray(jobs)) {
			res.status(200).json({count: jobs.length, jobs});
		}
	} catch (error) {
		next(error);
	}
}

// endpoint to get a job by id
const getJobById = async (req: any, res: any, next: any) => {
	try {
		let jobId = req.params.id;

		let [job, _] = await Job.findById(jobId);

		if (Array.isArray(job)) {
			res.status(200).json({job: job[0]});
		}
	} catch (error) {
		next(error);
	}
}

// endpoint to get all jobs with a specific status
const getJobsByStatus = async (req: any, res: any, next: any) => {
	try {
		let statusId = req.params.id;

		let [jobs, _] = await Job.findByStatusId(statusId);

		if (Array.isArray(jobs)) {
			res.status(200).json({count: jobs.length, jobs});
		}
	} catch (error) {
		next(error);
	}
}

// endpoint to get all jobs ordered by created_at in asc order
const getAllJobsByCreatedAt = async (req: any, res: any, next: any) => {
	try {
		let [jobs, _] = await Job.findAllOrderedByCreatedAt();

		if (Array.isArray(jobs)) {
			res.status(200).json({count: jobs.length, jobs});
		}
	} catch (error) {
		next(error);
	}
}



// endpoint to update status of a job
const updateJobStatus = async (req: any, res: any, next: any) => {
	try {
		let {id} = req.body;
		let {status_id} = req.body;

		let jobs = new Job();

		let [job, _] = await jobs.updateStatus(id, status_id);

		if (Array.isArray(job)) {
			res.status(200).json({job: job[0]});
		}
	} catch (error) {
		next(error);
	}
}

export {getAllJobs, getJobById, getJobsByStatus, getAllJobsByCreatedAt, updateJobStatus};