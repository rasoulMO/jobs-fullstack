import express from "express";
const router = express.Router();
const connection = require("../configs/db");


/* GET home page. */
router.get("/", function (req: any, res: any) {
	res.send("hello world 👋");
});

router.get("/create-project", function (req: any, res: any) {
	const sql = `
		CREATE TABLE IF NOT EXISTS project (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255) NOT NULL
		);
		`;
	connection.query(sql, function (err: any, result: any) {
		if (err) throw err;
		res.send("project table created");
	});
});


router.get("/insert-project", function (req: any, res: any) {
	const sql = `INSERT INTO project (title) VALUES ('project 1');`;
	connection.query(sql, function (err: any, result: any) {
		if (err) throw err;
		res.send(`project 1 inserted into table`);
	});
});


router.get("/create-status", function (req: any, res: any) {
	const sql = `
		CREATE TABLE IF NOT EXISTS status (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255) NOT NULL
		);
	`;
	connection.query(sql, function (err: any, result: any) {
		if (err) throw err;
		res.send("status table created");
	});
});

// insert 4 status (in preparation, in progress, delivered, cancelled)
router.get("/insert-status", function (req: any, res: any) {
	const sql = `INSERT INTO status (title) VALUES ('in preparation'), ('in progress'), ('delivered'), ('cancelled')`;
	connection.query(sql, function (err: any, result: any) {
		if (err) throw err;
		res.send(`status inserted into table`);
	});
});

router.get("/create-jobs", function (req: any, res: any) {
	const sql3 = `
		CREATE TABLE IF NOT EXISTS jobs (
			id INT AUTO_INCREMENT PRIMARY KEY,
			project_id INT NOT NULL,
			status_id INT NOT NULL,
			price FLOAT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (project_id) REFERENCES project(id),
			FOREIGN KEY (status_id) REFERENCES status(id) 
		);
	`;
	connection.query(sql3, function (err: any, result: any) {
		if (err) throw err;
		res.send("jobs table created");
	});
});


// insert 3 jobs (job 1, job 2, job 3)
router.get("/insert-jobs", function (req: any, res: any) {
	const sql = `INSERT INTO jobs (project_id, status_id, price, created_at ) VALUES (1, 1, 100, '2020-01-01 00:00:00'), (1, 2, 200, '2020-01-02 00:00:00'), (1, 3, 300, '2020-01-03 00:00:00')`;
	connection.query(sql, function (err: any, result: any) {
		if (err) throw err;
		res.send(`jobs inserted into table`);
	});
});


// // create a new project with its jobs
// router.post("/create-project-jobs", function (req: any, res: any) {
// 	const project = req.body.project;
// 	const jobs = req.body.jobs;
// 	const sql = `INSERT INTO project (title) VALUES ('${project.title}')`;
// 	connection.query(sql, function (err: any, result: any) {
// 		if (err) throw err;
// 		const project_id = result.insertId;
// 		jobs.forEach((job: any) => {
// 			const sql2 = `INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (${project_id}, ${job.status_id}, ${job.price}, '${job.created_at}')`;
// 			connection.query(sql2, function (err: any, result: any) {
// 				if (err) throw err;
// 				res.send(`project and jobs inserted into table`);
// 			});
// 		});
// 	});
// });


// get all jobs ordered by created_at ASC 
router.get("/fetch-jobs-ordered-by-created_at", function (req: any, res: any) {
	const sql = `SELECT * FROM jobs ORDER BY jobs.created_at DESC`;
	connection.query(sql, function (err: any, result: any, fields: any) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

module.exports = router;
