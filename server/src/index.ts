const express = require('express');

const app = express();
const port = 8080;

/* Routes */
const indexRouter = require('./routes/index');
const projectRouter = require('./routes/project');

app.use('/', indexRouter);
app.use('/projects', projectRouter);


app.listen(3000);

console.log("listening on port 3000");

