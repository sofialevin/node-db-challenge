const express = require('express');

const ProjectRouter = require('./projects/projectRouter');
const TaskRouter = require('./tasks/taskRouter');
const ResourceRouter = require('./resources/resourceRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);
server.use('/api/resources', ResourceRouter);

module.exports = server;