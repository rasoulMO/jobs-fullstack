const express = require('express');
const app = express();



// Middleware
app.use(express.json());

/* Routes */
const indexRouter = require('./routes/index');
const projectRouter = require('./routes/project');

app.use('/', indexRouter);
app.use('/projects', projectRouter);


// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err: {stack: any; name: any; code: any;}, req: any, res: {status: (arg0: number) => {(): any; new(): any; json: {(arg0: {message: string;}): void; new(): any;};};}, next: any) => {
	console.log(err.stack);
	console.log(err.name);
	console.log(err.code);

	res.status(500).json({
		message: "Something went rely wrong",
	});
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));