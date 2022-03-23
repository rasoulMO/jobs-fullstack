const Project = require("../models/Project");

// get all projects with their jobs
exports.getAllProjects = async (req: any, res: any, next: any) => {
	try {
		const [projects, _] = await Project.findAll();

		res.status(200).json({count: projects.length, projects});
	} catch (error) {
		next(error);
	}
};


// get project by id with his jobs
exports.getProjectById = async (req: any, res: any, next: any) => {
	try {
		let projectId = req.params.id;

		let [project, _] = await Project.findById(projectId);

		// TODO: add check if project if correct with project[0]
		res.status(200).json({project: project});
	} catch (error) {
		next(error);
	}
};

// add new job to existing project by id
exports.addJobToProject = async (req: any, res: any, next: any) => {
	try {
		const project_id = req.params.id;
		const {status_id, price, created_at} = req.body;

		let project = new Project();
		project = await project.addJob(project_id, status_id, price, created_at);

		res.status(200).json({message: "job added"});
	} catch (error) {
		next(error);
	}
};

// create new project and add jobs to it
exports.createNewProject = async (req: any, res: any, next: any) => {
	try {
		let {title, jobs} = req.body;

		// let project = new Project(title, jobs);

		let project = await Project.create(title, jobs);

		res.status(201).json({message: "Project created"});

	} catch (error) {
		next(error);
	}
};


