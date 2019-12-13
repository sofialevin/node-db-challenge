const express = require('express');

const Resources = require('./resourceModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  Resources.find()
  .then(resources => res.status(200).json(resources))
  .catch(err => res.status(500).json({ message: "'Failed to get resources from database'", error: err }))
})

router.post('/', checkName, (req, res) => {
  const { body } = req

  Resources.add(body)
  .then(resource => res.status(201).json(resource))
  .catch(err => res.status(500).json({ message: "'Failed to create resource in database'", error: err }))
})

function checkName(req, res, next) {
  const name = req.body.resource_name

  Resources.find()
  .then((resources) => {
    if (resources.length > 0) {
      resources.map(resource => {
        if (resource.resource_name === name) {
          res.status(400).json({ message: "Resource already exists" })
        } else if (!name) {
          res.status(400).json({ message: "Please provide a name for the resource."})
        } else {
          next();
        }
      })
    } else {
      next()
    }
  })
  .catch(err => console.log(err))
}

module.exports = router;