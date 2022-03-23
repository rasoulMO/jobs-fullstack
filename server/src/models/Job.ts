const dbb = require("../configs/db");


class Jobs {
	id: number;
	title: string;
	project_id: number;
	status_id: number;
	price: number;

	constructor(id: number, title: string, project_id: number, status_id: number, price: number) {
		this.id = id
		this.title = title;
		this.project_id = project_id;
		this.status_id = status_id;
		this.price = price;
	}


	static findAll() {
		let sql = `SELECT * FROM jobs`;

		return dbb.promise().query(sql);
	}

	static findById(id: number) {
		let sql = `SELECT * FROM jobs WHERE id = ${id};`;

		return dbb.promise().query(sql);
	}

	static findByStatusId(id: number) {
		let sql = `SELECT * FROM jobs JOIN status ON jobs.status_id = status.id WHERE status.id = ${id};`;

		return dbb.promise().query(sql);
	}

	static findAllOrderedByCreatedAt() {
		const sql = `SELECT * FROM jobs ORDER BY 'jobs.created_at' DESC`;

		return dbb.promise().query(sql);
	}

	updateStatus(id: number, status_id: number) {
		let sql = `UPDATE jobs SET status_id = ${status_id} WHERE id = ${id}`;

		return dbb.promise().query(sql);
	}

}

module.exports = Jobs;