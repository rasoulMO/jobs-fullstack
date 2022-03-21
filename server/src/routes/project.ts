import express from "express";
const {getAllProjects, getProjectById, createNewProject} = require("../controllers/project.controllers");
const router = express.Router();


// @route GET && POST - /projects/
router
	.route("/")
	.get(getAllProjects)


router.route("/create").post(createNewProject);
router.route("/:id").get(getProjectById);

module.exports = router;



// router.get("/insert", function (req: any, res: {send: (arg0: string) => void;}) {
// 	connections.connect(function (err: any) {
// 		if (err) throw err;
// 		const sql = `INSERT INTO project (title) VALUES ('project 1')`;
// 		connections.query(sql, function (err: any, result: any) {
// 			if (err) throw err;
// 			res.send(`project 1 inserted into table`);
// 		});
// 	});
// });


// router.get('/fetch', function (req, res, next) {
// 	try {
// 		// res.send(project.getMultiple())
// 		const rows = db.execute(`SELECT * FROM project`);
// 		res.send(rows);
// 		console.log("fetching!!!");
// 	} catch (err) {
// 		console.error(`Error while getting project `, err);
// 		next(err);
// 	}
// });

// // router.get('/fetch', async function (req, res, next) {
// // 	try {
// // 		res.json(await project.getMultiple(req.query.page));
// // 	} catch (err: any) {
// // 		console.error(`Error while getting project `, err.message);
// // 		next(err);
// // 	}
// // });

// // router.get("/fetch", function (req: any, res: {send: (arg0: string) => void;}) {
// // 	connections.connect(function (err: any) {
// // 		if (err) throw err;
// // 		const sql = `SELECT * FROM project`;
// // 		connections.query(sql, function (err: any, result: any, fields: any) {
// // 			if (err) throw err;
// // 			res.send(JSON.stringify(result));
// // 		});
// // 	});
// // });

// module.exports = router;
