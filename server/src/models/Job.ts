const dbb = require("../configs/db");


class Jobs {
	id: number;
	title: string;
	project_id: number;
	status_id: number;
	price: number;
	created_at: string;

	constructor(id: number, title: string, project_id: number, status_id: number, price: number, created_at: string) {
		this.id = id
		this.title = title;
		this.project_id = project_id;
		this.status_id = status_id;
		this.price = price;
		this.created_at = created_at;

	}

	save() {
		let sql = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES ('${this.project_id}', '${this.status_id}', '${this.price}','${this.created_at}');`;

		return dbb.promise().query(sql);
	}

	updateStatus(id: number, status_id: number) {
		let sql = `UPDATE jobs SET status_id = ${status_id} WHERE id = ${id}`;

		return dbb.promise().query(sql);
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
		let sql = `SELECT DATE(created_at) as date FROM jobs ORDER BY jobs.created_at DESC`;

		return dbb.promise().query(sql);
	}


}

module.exports = Jobs;