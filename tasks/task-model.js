const db = require('../data/db-config.js');

function find() {
    return db('tasks')
        .join('projects', 'tasks.project_id', 'projects.id')
        .select('tasks.id as id', 'projects.project_name as project_name', 'projects.description as description', 'tasks.task_description as task_description', 'tasks.task_notes as task_notes', 'tasks.completed as completed')
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