const Project = require("../models/Project");

exports.getAllProjects = async (req: any, res: any, next: any) => {
	try {
		const [projects, _] = await Project.findAll();

		res.status(200).json({count: projects.length, projects});
	} catch (error) {
		next(error);
	}
};

exports.createNewProject = async (req: any, res: any, next: any) => {
	try {
		// let {title} = req.body;
		let title: string = "project 1";
		let project = new Project(title);

		project = await project.save();

		res.status(201).json({message: "Project created"});
	} catch (error) {
		next(error);
	}
};

exports.getProjectById = async (req: any, res: any, next: any) => {
	try {
		let projectId = req.params.id;

		let [project, _] = await Project.findById(projectId);

		res.status(200).json({project: project[0]});
	} catch (error) {
		next(error);
	}
};
