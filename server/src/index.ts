import {Response} from "express";

const express = require('express');

const app = express();



// Middleware
app.use(express.json());

/* Routes */
const indexRouter = require('./routes/index');
const projectRouter = require('./routes/project');
const jobRouter = require('./routes/job');

app.use('/', indexRouter);
app.use('/projects', projectRouter);
app.use('/jobs', jobRouter);


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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));