const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => res.status(200).json(projects))
  .catch(err => res.status(500).json({ message: "'Failed to get projects from database'", error: err }))
})

module.exports = router;