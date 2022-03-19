const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 8080;

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || "localhost",
	user: process.env.MYSQL_USER || "root",
	password: process.env.MYSQL_PASSWORD || "password",
	database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req: any, res: {json: (arg0: {success: boolean; err?: any; data?: any;}) => void;}) => {
	connection.query("SELECT * FROM Student", (err: any, data: any) => {
		if (err) {
			res.json({
				success: false,
				err,
			});
		} else {
			res.json({
				success: true,
				data: data,
			});
		}
	});
});

app.listen(port, () => {
	console.log(`server is running test on port ${port}`);
});
