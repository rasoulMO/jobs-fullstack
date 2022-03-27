import express from "express";
import {db} from "../configs/db.config";
const homeRouter = express.Router();


/* GET home page. */
homeRouter.get("/", function (req: any, res: any) {
	res.send("hello world 👋");
});


// get all jobs ordered by created_at ASC 
homeRouter.get("/fetch-jobs-ordered-by-created_at", function (req: any, res: any) {
	const sql = `SELECT * FROM jobs ORDER BY jobs.created_at DESC`;
	db.query(sql, function (err: any, result: any, fields: any) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

export {homeRouter};
