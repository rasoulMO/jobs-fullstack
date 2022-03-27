const env = process.env
import {createPool} from "mysql2";
import PoolConnection from "mysql2/typings/mysql/lib/PoolConnection";

const db_config = {
	host: env.MYSQL_HOST || "mysql_server",
	user: env.MYSQL_USER || "user",
	password: env.MYSQL_PASSWORD || "password",
	database: env.MYSQL_DATABASE || "test_db",
}

const db = createPool(db_config);

db.getConnection((err: NodeJS.ErrnoException, connection: PoolConnection) => {
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


export {db};
