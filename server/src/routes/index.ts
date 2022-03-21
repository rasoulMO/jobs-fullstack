import express from "express";
const router = express.Router();

const mysqls = require("mysql2");


const connection = mysqls.createConnection({
	host: "mysql_server",
	user: "rasoul",
	password: "secret",
	database: "test_db",
});

/* GET home page. */
router.get("/", function (req, res, next) {
	res.json({message: "ok..."});
});


// respond with "hello world" when a GET request is made to the homepage
router.get("/", function (req: any, res: {send: (arg0: string) => void;}) {
	res.send("hello world");
});

router.get("/connect", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		res.send("connected");
	});
});


// project
router.get("/drop-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
			DROP TABLE IF EXISTS project;
  `;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("project table drobt");
		});
	});
});


router.get("/create-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
    CREATE TABLE IF NOT EXISTS project (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    )  ENGINE=INNODB;
  `;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("project table created");
		});
	});
});

router.get("/insert-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `INSERT INTO project (title) VALUES ('project 1')`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`project 1 inserted into table`);
		});
	});
});

router.get("/fetch-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM project`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});


// status 
// drop status table
router.get("/drop-status", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
			DROP TABLE IF EXISTS status;
		`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("status table drobt");
		});
	});
});

router.get("/create-status", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
    CREATE TABLE IF NOT EXISTS status (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    )  ENGINE=INNODB;
  `;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("status table created");
		});
	});
});

// insert 4 status (in preparation, in progress, delivered, cancelled)
router.get("/insert-status", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `INSERT INTO status (title) VALUES ('in preparation'), ('in progress'), ('delivered'), ('cancelled')`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`status inserted into table`);
		});
	});
});


router.get("/fetch-status", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM status`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});




// jobs
//  drop jobs table
router.get("/drop-jobs", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
			DROP TABLE IF EXISTS jobs;
		`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("jobs table drobt");
		});
	});
});


router.get("/create-jobs", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
			project_id INT NOT NULL,
			status_id INT NOT NULL,
			price FLOAT NOT NULL,
			created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (project_id) REFERENCES project(id),
			FOREIGN KEY (status_id) REFERENCES status(id) 
    )  ENGINE=INNODB;
  `;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("jobs table created");
		});
	});
});


// insert 3 jobs (job 1, job 2, job 3)
router.get("/insert-jobs", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `INSERT INTO jobs (project_id, status_id, price, created_at ) VALUES (1, 1, 100, '2020-01-01 00:00:00'), (1, 2, 200, '2020-01-02 00:00:00'), (1, 3, 300, '2020-01-03 00:00:00')`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`jobs inserted into table`);
		});
	});
});


router.get("/fetch-jobs", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM jobs`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});


// project JOINED jobs
router.get("/fetch-join-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM jobs JOIN project ON jobs.project_id = project.id`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});


// get all projects with their jobs
router.get("/fetch-join-project-jobs", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM project JOIN jobs ON project.id = jobs.project_id`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});

// add job to project 
router.get("/add-job-to-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `
		INSERT INTO jobs (project_id, status_id, price, created_at) VALUES (1, 1, 200, NOW())
		`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`job 1 inserted into table`);
		});
	});
});




// get all jobs by status id
router.get("/fetch-jobs-by-status/:id", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM jobs JOIN status ON jobs.status_id = status.id WHERE status.id = 1`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});


// get all jobs ordered by created_at ASC 
router.get("/fetch-jobs-ordered-by-created_at", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM jobs ORDER BY created_at ASC`;
		connection.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});

// change the status of specific job
router.get("/change-status-of-job/:id", function (req: any, res: {send: (arg0: string) => void;}) {
	connection.connect(function (err: any) {
		if (err) throw err;
		const params = req.params.id;
		const sql = `UPDATE jobs SET status_id = 2 WHERE id = ${params}`;
		connection.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`job 1 status changed to 2`);
		});
	});
});

module.exports = router;
