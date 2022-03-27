import {db} from "../configs/db.config";


export class Job {

	constructor() { }


	static findAll() {
		let sql = `SELECT * FROM jobs`;

		return db.promise().query(sql);
	}

	static findById(id: number) {
		let sql = `SELECT * FROM jobs WHERE id = ${id};`;

		return db.promise().query(sql);
	}

	static findByStatusId(id: number) {
		let sql = `SELECT * FROM jobs JOIN status ON jobs.status_id = status.id WHERE status.id = ${id};`;

		return db.promise().query(sql);
	}

	static findAllOrderedByCreatedAt() {
		const sql = `SELECT * FROM jobs ORDER BY 'jobs.created_at' DESC`;

		return db.promise().query(sql);
	}

	updateStatus(id: number, status_id: number) {
		let sql = `UPDATE jobs SET status_id = ${status_id} WHERE id = ${id}`;

		return db.promise().query(sql);
	}

}
