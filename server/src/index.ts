const express = require('express');
const connections = require('./configs/db');

const app = express();
const port = 8080;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req: any, res: {send: (arg0: string) => void;}) {
	res.send("hello world");
});

app.get("/connect", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		res.send("connected");
	});
});

app.get("/drop-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `
			DROP TABLE IF EXISTS project;
  `;
		connections.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send("project table drobt");
		});
	});
});


app.get("/create-project", function (req: any, res: {send: (arg0: string) => void;}) {
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

app.get("/insert-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `INSERT INTO project (title) VALUES ('project 1')`;
		connections.query(sql, function (err: any, result: any) {
			if (err) throw err;
			res.send(`project 1 inserted into table`);
		});
	});
});


app.get("/fetch-project", function (req: any, res: {send: (arg0: string) => void;}) {
	connections.connect(function (err: any) {
		if (err) throw err;
		const sql = `SELECT * FROM project`;
		connections.query(sql, function (err: any, result: any, fields: any) {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});


app.listen(3000);

console.log("listening on port 3000");