const express = require('express');
const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const teachersRouter = require('./routes/teachers');
require('dotenv').config()

const massive = require('massive')
const { CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.use('/api/classes', classesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/teachers', teachersRouter);

// setup massive
massive(CONNECTION_STRING).then(connection => {
  app.set('db', connection);
  
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
})