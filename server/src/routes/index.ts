import express from "express";
const router = express.Router();
const connection = require("../configs/db");


/* GET home page. */
router.get("/", function (req: any, res: any) {
	res.send("hello world 👋");
});


// get all jobs ordered by created_at ASC 
router.get("/fetch-jobs-ordered-by-created_at", function (req: any, res: any) {
	const sql = `SELECT * FROM jobs ORDER BY jobs.created_at DESC`;
	connection.query(sql, function (err: any, result: any, fields: any) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

module.exports = router;
