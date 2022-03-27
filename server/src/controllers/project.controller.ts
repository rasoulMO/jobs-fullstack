import {Projects} from "../models/project.model";

// get all projects with their jobs
const getAllProjects = async (req: any, res: any, next: any) => {
	try {
		const [projects, _] = await Projects.findAll();

		res.status(200).json({count: projects.length, projects});
	} catch (error) {
		next(error);
	}
};


// get project by id with his jobs
const getProjectById = async (req: any, res: any, next: any) => {
	try {
		let projectId = req.params.id;

		let [project, _] = await Projects.findById(projectId);

		// TODO: add check if project if correct with project[0]
		res.status(200).json({project: project});
	} catch (error) {
		next(error);
	}
};

// add new job to existing project by id
const addJobToProject = async (req: any, res: any, next: any) => {
	try {
		const project_id = req.params.id;
		const {status_id, price, created_at} = req.body;

		let project = new Projects();
		await project.addJob(project_id, status_id, price, created_at);

		res.status(200).json({message: "job added"});
	} catch (error) {
		next(error);
	}
};

// create new project and add jobs to it
const createNewProject = async (req: any, res: any, next: any) => {
	try {
		let {title, jobs} = req.body;

		// let project = new Project(title, jobs);

		let project = await Projects.create(title, jobs);

		res.status(201).json({message: "Project created"});

	} catch (error) {
		next(error);
	}
};


export {getAllProjects, getProjectById, addJobToProject, createNewProject};