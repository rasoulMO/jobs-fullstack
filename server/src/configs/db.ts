const mysql = require("mysql2");
const env = process.env;
const db = {
	host: "mysql_server",
	user: "rasoul",
	password: "secret",
	database: "test_db",
}


const connection = mysql.createConnection(db);

module.exports = connection;