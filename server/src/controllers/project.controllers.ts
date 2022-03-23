const Project = require("../models/Project");

exports.getAllProjects = async (req: any, res: any, next: any) => {
	try {
		const [projects, _] = await Project.findAll();

		res.status(200).json({count: projects.length, projects});
	} catch (error) {
		next(error);
	}
};

// create new project and add jobs to it
exports.createNewProject = async (req: any, res: any, next: any) => {
	try {
		let {title, jobs} = req.body;

		let project = new Project(title, jobs);

		project = await project.createNewProjec();

		res.status(201).json({message: "Project created"});

	} catch (error) {
		next(error);
	}
};

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
