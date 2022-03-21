const db = require("../configs/db");


// router.get("/", function (req: any, res: {send: (arg0: string) => void;}) {
// 	connections.connect(function (err: any) {
// 		if (err) throw err;
// 		const sql = `
//     CREATE TABLE IF NOT EXISTS project (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL
//     )  ENGINE=INNODB;
//   `;
// 		connections.query(sql, function (err: any, result: any) {
// 			if (err) throw err;
// 			res.send("project table created");
// 		});
// 	});
// });


class Projects {
	title: string;

	constructor(title: string) {
		this.title = title;
	}

	save() {
		// let d = new Date();
		// let yyyy = d.getFullYear();
		// let mm = d.getMonth() + 1;
		// let dd = d.getDate();

		// let createdAtDate = `${yyyy}-${mm}-${dd}`;

		// `INSERT INTO project (title) VALUES ('project 91')`;
		let sql = "INSERT INTO `project` (`title`) VALUES (?)";

		return db.execute(sql);
	}

	static findAll() {
		let sql = "SELECT * FROM project;";

		return db.execute(sql);
	}

	static findById(id: number) {
		let sql = `SELECT * FROM project WHERE id = ${id};`;

		return db.execute(sql);
	}
}

module.exports = Projects;
