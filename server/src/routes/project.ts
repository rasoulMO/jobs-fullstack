import express from "express";
const connections = require("../configs/db");
const router = express.Router();

/* GET project page. */
router.get("/", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `
    CREATE TABLE IF NOT EXISTS project (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    )  ENGINE=INNODB;
  `;
		connections.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("project table created");
		});
	});
});


router.get("/insert", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `INSERT INTO project (title) VALUES ('project 1')`;
		connections.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`project 1 inserted into table`);
		});
	});
});

router.get("/fetch", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM project`;
		connections.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});

module.exports = router;
