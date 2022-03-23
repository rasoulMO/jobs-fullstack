const db = require("../configs/db");


class Projects {
	title: string;
	jobs: any;

	constructor(title: string, jobs: any) {
		this.title = title;
		this.jobs = jobs;
	}


	save() {
		// let d = new Date();
		// let yyyy = d.getFullYear();
		// let mm = d.getMonth() + 1;
		// let dd = d.getDate();

		// let createdAtDate = `${yyyy}-${mm}-${dd}`;

		// `INSERT INTO project (title) VALUES ('project 91')`;
		let sql = `INSERT INTO project (title) VALUES ('${this.title}');`;

		return db.promise().query(sql);
	}
	// create new project and add jobs to it
	createNewProjec() {
		let sql = `INSERT INTO project (title) VALUES ('${this.title}');`;

		return db.promise().query(sql)
			.then(() => {
				let sql = `SELECT id FROM project WHERE title = '${this.title}';`;

				return db.promise().query(sql);
			})
			.then(([project]: any) => {
				let projectId = project[0].id;

				let sql = `INSERT INTO job (project_id, status_id, price, created_at) VALUES `;

				this.jobs.forEach((job: any) => {
					sql += `(${projectId}, ${job.status_id}, ${job.price}, '${job.created_at}'), `;
				});

				sql = sql.slice(0, -2);

				return db.promise().query(sql);
			});
	}


	static findAll() {
		let sql_projects = `SELECT * FROM project`;
		let sql_jobs = `SELECT * FROM jobs`;

		return db.promise().query(sql_projects)
			.then(([projects]: any) => {
				let project_list = projects.map((project: any) => {
					return {
						id: project.id,
						title: project.title,
						jobs: []
					};
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

	static findById(id: number) {
		let sql_project = `SELECT * FROM project WHERE id = ${id};`;
		let sql_jobs = `SELECT * FROM jobs`;

		return db.promise().query(sql_project)
			.then(([projects]: any) => {
				let project_list = projects.map((project: any) => {
					return {
						id: project.id,
						title: project.title,
						jobs: []
					};
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
