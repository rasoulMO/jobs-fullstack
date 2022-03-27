import express, {Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

/* Routes */
import {homeRouter} from './routes/index.router';
import {projectsRouter} from './routes/project.router';
import {jobsRouter} from './routes/job.router';

app.use('/', cors(), homeRouter);
app.use('/projects', cors(), projectsRouter);
app.use('/jobs', cors(), jobsRouter);


// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err: any, res: Response) => {

	// Log error
	if (err) {
		console.log("stack :", err.stack);
		console.log("name :", err.name);
		console.log("massage :", err.message);
	}

	// Send error message 400
	res.status(400).send({
		message: err.message,
		name: err.name,
		stack: err.stack
	});

	// Send error message 404
	res.status(404).send({
		message: err.message,
		name: err.name,
		stack: err.stack
	});


	// Send error message 500
	res.status(500).json({
		message: "Something went rely wrong",
	});
});

// Listen on pc port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));