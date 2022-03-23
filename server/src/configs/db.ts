import {MysqlError} from "mysql";
import {Connection} from "mysql2";
const env = process.env
const mysql = require("mysql2");

const db_config = {
	host: env.MYSQL_HOST || "mysql_server",
	user: env.MYSQL_USER || "user",
	password: env.MYSQL_PASSWORD || "password",
	database: env.MYSQL_DATABASE || "test_db",
}

const mysqlConnection = mysql.createPool(db_config);

mysqlConnection.getConnection((err: MysqlError, connection: Connection) => {
	if (err) {
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			console.error("Database connection was closed.");
		}
		if (err.code === "ER_CON_COUNT_ERROR") {
			console.error("Database has too many connections.");
		}
		if (err.code === "ECONNREFUSED") {
			console.error("Database connection was refused.");
		}
	}

	if (connection) connection.connect();
	return;
});


module.exports = mysqlConnection;
