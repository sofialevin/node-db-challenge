const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => {
    res.json({projects});
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   Schemes.findById(id)
//   .then(scheme => {
//     if (scheme) {
//       res.json(scheme);
//     } else {
//       res.status(404).json({ message: 'Could not find scheme with given id.' })
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get schemes' });
//   });
// });

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  Projects.findTasks(id)
  .then(tasks => {
    if (tasks.length) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: 'Could not find tasks for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.add(projectData)
  .then(projects => {
    res.status(201).json(projects.map(project => {
        return {
            ...project, completed: project.completed ? true : false
        }
    })
    )})
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new project' });
      });
});

// router.post('/:id/steps', (req, res) => {
//   const stepData = req.body;
//   const { id } = req.params; 

//   Schemes.findById(id)
//   .then(scheme => {
//     if (scheme) {
//       Schemes.addStep(stepData, id)
//       .then(step => {
//         res.status(201).json(step);
//       })
//     } else {
//       res.status(404).json({ message: 'Could not find scheme with given id.' })
//     }
//   })
//   .catch (err => {
//     res.status(500).json({ message: 'Failed to create new step' });
//   });
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Schemes.findById(id)
//   .then(scheme => {
//     if (scheme) {
//       Schemes.update(changes, id)
//       .then(updatedScheme => {
//         res.json(updatedScheme);
//       });
//     } else {
//       res.status(404).json({ message: 'Could not find scheme with given id' });
//     }
//   })
//   .catch (err => {
//     res.status(500).json({ message: 'Failed to update scheme' });
//   });
// });

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;

//   Schemes.remove(id)
//   .then(deleted => {
//     if (deleted) {
//       res.json({ removed: deleted });
//     } else {
//       res.status(404).json({ message: 'Could not find scheme with given id' });
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to delete scheme' });
//   });
// });

module.exports = router;