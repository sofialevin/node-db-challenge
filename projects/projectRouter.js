const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => res.status(200).json(projects))
  .catch(err => res.status(500).json({ message: "'Failed to get projects from database'", error: err }))
})

router.post('/', (req, res) => {
  const { body } = req

  if (body.project_name) {
    Projects.add(body)
      .then(project => res.status(201).json({...project, completed: project.completed ? true : false}))
      .catch(err => res.status(500).json({ message: "'Failed to get projects from database'", error: err }))
  } else {
    res.status(400).json({ message: "Missing project name" })
  }
})

module.exports = router;