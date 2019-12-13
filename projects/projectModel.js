const db = require('../data/db-config.js');

function find() {
  return db('projects');
}

function add(project) {
  db('projects')
    .insert(project)
    .then(res => {
      const id = res[0];
      return db("projects").where({ id });
    });
}

module.exports = {
  find,
  add
};