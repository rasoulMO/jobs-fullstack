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


	// JOIN jobs ON project.id = jobs.project_id
	static findAll() {
		let sql = `SELECT * FROM project`;

		return db.promise().query(sql);
	}

	static findById(id: number) {
		let sql = `SELECT * FROM project WHERE id = ${id};`;

		return db.promise().query(sql);
	}
}

module.exports = Projects;
