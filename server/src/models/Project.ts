const db = require("../configs/db");


class Projects {
	title: string;
	jobs: any;
	status_id: number;
	price: number;
	created_at: string;

	constructor(title: string, jobs: any, status_id: number, price: number, created_at: string) {
		this.title = title;
		this.jobs = jobs;
		this.status_id = status_id;
		this.price = price;
		this.created_at = created_at;
	}


	// create new project and add jobs to it 
	static create(title: string, jobs: any) {
		const sql = `INSERT INTO project (title) VALUES ('${title}')`;

		return db.promise().query(sql, (err: any, result: any) => {
			if (err) throw err;
			const project_id = result.insertId;
			jobs.forEach((job: any) => {
				const sql2 = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (${project_id}, ${job.status_id}, ${job.price}, '${job.created_at}')`;
				db.promise().query(sql2);
			});
		});
	}

	// createNewProject() {
	// 	const sql = `INSERT INTO project (title) VALUES ('${this.title}')`;

	// 	return db.promise().query(sql, (err: any, result: any) => {
	// 		if (err) throw err;
	// 		const project_id = result.insertId;
	// 		this.jobs.forEach((job: any) => {
	// 			const sql2 = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (${project_id}, ${job.status_id}, ${job.price}, '${job.created_at}')`;
	// 			db.promise().query(sql2);
	// 		});
	// 	});
	// }

	addJob(id: number, status_id: number, price: number, created_at: string) {
		const sql = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (${id}, ${status_id}, ${price}, '${created_at}')`;

		return db.promise().query(sql);
	}

	static findAll() {
		let sql_projects = `SELECT * FROM project`;
		let sql_jobs = `SELECT * FROM jobs`;

		return db.promise().query(sql_projects)
			.then(([projects]: any) => {
				let project_list = projects.map((project: any) =>
				([{
					id: project.id,
					title: project.title,
					jobs: []
				}]
				));
				return db.promise().query(sql_jobs)
					.then(([jobs]: any) => {
						project_list.flat().forEach((project: any) => {
							jobs.forEach((job: any) => {
								if (project.id === job.project_id) {
									project.jobs.push(job);
								}
							});
						});
						return project_list;
					});
			});
	}

	static findById(id: number) {
		let sql_project = `SELECT * FROM project WHERE id = ${id};`;
		let sql_jobs = `SELECT * FROM jobs`;

		return db.promise().query(sql_project)
			.then(([projects]: any) => {
				let project_list = projects.map((project: any) => {
					return [{
						id: project.id,
						title: project.title,
						jobs: []
					}];
				});
				return db.promise().query(sql_jobs)
					.then(([jobs]: any) => {
						project_list.forEach((project: any) => {
							jobs.forEach((job: any) => {
								if (project.id === job.project_id) {
									project.jobs.push(job);
								}
							});
						});
						return project_list;
					});
			});
	}
}

module.exports = Projects;
