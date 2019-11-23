const express = require('express');

const Resources = require('./resource-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Resources.find()
  .then(resources => {
    res.json({resources});
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});


router.post('/', (req, res) => {
  const resourceData = req.body;

  if (!resourceData.resource_name) {
    res.status(400).json({ message: "Please provide a name for the resource."})
  } else {
    Resources.add(resourceData)
    .then(resources => {
        res.status(201).json(resources.map(resource => resource)
        )}
    )
        .catch (err => {
            res.status(500).json({ message: 'Failed to create new project' });
        });
  }
});

module.exports = router;