const mysql = require("mysql2");
const env = process.env;

const db_config = {
	host: "mysql_server",
	user: "rasoul",
	password: "secret",
	database: "test_db",
}

const pool = mysql.createPool(db_config);

module.exports = pool.promise();
