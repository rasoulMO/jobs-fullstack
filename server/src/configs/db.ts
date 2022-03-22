const mysql = require("mysql2");

const db_config = {
	host: "mysql_server",
	user: "rasoul",
	password: "secret",
	database: "test_db",
}

const mysqlConnection = mysql.createConnection(db_config);

mysqlConnection.connect((err: any) => {
	if (!err) {
		console.log("Connected");
	} else {
		console.log("Connection Failed");
	}
});

module.exports = mysqlConnection.promise();
