const Job = require('../models/Job');


// endpoint to get all jobs
exports.getAllJobs = async (req: any, res: any, next: any) => {
	try {
		let [jobs, _] = await Job.findAll();

		res.status(200).json({count: jobs.length, jobs});
	} catch (error) {
		next(error);
	}
}

// endpoint to get a job by id
exports.getJobById = async (req: any, res: any, next: any) => {
	try {
		let jobId = req.params.id;

		let [job, _] = await Job.findById(jobId);

		res.status(200).json({job: job[0]});
	} catch (error) {
		next(error);
	}
}

// endpoint to get all jobs with a specific status
exports.getJobsByStatus = async (req: any, res: any, next: any) => {
	try {
		let statusId = req.params.id;

		let [jobs, _] = await Job.findByStatusId(statusId);

		res.status(200).json({count: jobs.length, jobs});
	} catch (error) {
		next(error);
	}
}

// endpoint to get all jobs ordered by created_at in asc order
exports.getAllJobsByCreatedAt = async (req: any, res: any, next: any) => {
	try {
		let [jobs, _] = await Job.findAllOrderedByCreatedAt();

		res.status(200).json({count: jobs.length, jobs});
	} catch (error) {
		next(error);
	}
}



// endpoint to update status of a job
exports.updateJobStatus = async (req: any, res: any, next: any) => {
	try {
		let {id} = req.body;
		let {status_id} = req.body;

		let jobs = new Job();

		let [job, _] = await jobs.updateStatus(id, status_id);

		res.status(200).json({job: job[0]});
	} catch (error) {
		next(error);
	}
}


// endpoint to create a new job
exports.createJob = async (req: any, res: any, next: any) => {
	try {
		let {project_id, status_id, price, created_at} = req.body;
		let job = new Job(project_id, status_id, price, created_at);

		job = await job.save();

		res.status(201).json({message: "Job created"});
	} catch (error) {
		next(error);
	}
}