const express = require('express');

const Tasks = require('./taskModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.find()
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({ message: "'Failed to get tasks from database'", error: err }))
})

router.post('/', checkData, (req, res) => {
  const { body } = req
  
  Tasks.add(body)
    .then(task => res.status(201).json({...task, completed: task.completed ? true : false}))
    .catch(err => res.status(500).json({ message: "'Failed to create task in database'", error: err }))
})

function checkData(req, res, next) {
  const { body } = req

  if (!body.project_id) {
    res.status(400).json({ message: "Please provide a project_id for the task."})
  } else if (!body.task_description) {
    res.status(400).json({ message: "Please provide a description for the task."})
  } else {
    next()
  }
}

module.exports = router;