import {Response} from "express";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

/* Routes */
const indexRouter = require('./routes/index');
const projectRouter = require('./routes/project');
const jobRouter = require('./routes/job');

app.use('/', cors(), indexRouter);
app.use('/projects', cors(), projectRouter);
app.use('/jobs', cors(), jobRouter);


// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err: Error, res: Response) => {
	console.log(err.stack);
	console.log(err.name);
	console.log(err.message);

	res.status(500).json({
		message: "Something went rely wrong",
	});
});

// Listen on pc port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));