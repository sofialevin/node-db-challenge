const db = require('../data/db-config.js');

function find() {
  return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.id')
    .select('*')
}

function add(task) {
  return db('tasks')
    .insert(task)
    .then(res => {
      const id = res[0];
      return db("tasks").where({ id });
    });
}

module.exports = {
  find,
  add
};