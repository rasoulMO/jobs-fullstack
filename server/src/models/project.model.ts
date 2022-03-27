
import {RowDataPacket} from "mysql2";
import {db} from "../configs/db.config";


export class Projects {
	constructor() { }


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

	addJob(id: number, status_id: number, price: number, created_at: string) {
		const sql = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (${id}, ${status_id}, ${price}, '${created_at}')`;

		return db.promise().query<RowDataPacket[]>(sql);
	}

	static findAll() {
		let sql_projects = `SELECT * FROM project`;
		let sql_jobs = `SELECT * FROM jobs`;

		return db.promise().query(sql_projects)
			.then(([projects]: any) => {
				return db.promise().query(sql_jobs)
					.then(([jobs]: any) => {
						projects.forEach((project: any) => {
							project.jobs = [];
							jobs.forEach((job: any) => {
								if (job.project_id === project.id) {
									project.jobs.push(job);
								}
							});
						});
						return [projects, jobs];
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
}

