const express = require('express');

const Tasks = require('./taskModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Tasks.find()
  .then(tasks => res.status(200).json(tasks))
  .catch(err => res.status(500).json({ message: "'Failed to get tasks from database'", error: err }))
})

module.exports = router;