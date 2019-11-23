const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });
  
  router.post('/', (req, res) => {
    const taskData = req.body;
    
    if (!taskData.project_id) {
        res.status(400).json({ message: "Please provide a project_id for the task."})
    } else if (!taskData.task_description) {
        res.status(400).json({ message: "Please provide a description for the task."})
    } else {
        Tasks.add(taskData)
    .then(tasks => {
      res.status(201).json(tasks.map(task => {
          return {
              ...task, completed: task.completed ? true : false
          }
      }));
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
    }
  });

module.exports = router;