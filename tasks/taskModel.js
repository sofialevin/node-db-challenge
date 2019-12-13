const db = require('../data/db-config.js');

function find() {
  return db('tasks');
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