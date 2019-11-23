const db = require('../data/db-config.js');

function find() {
    return db('projects');
}

function add(project) {
    return db('projects')
        .insert(project)
        .then(res => {
            const id = res[0];
            return db("projects").where({ id });
          });
}

function findTasks(id) {
    return db('projects')
        .join('tasks', 'tasks.project_id', 'projects.id')
        .select('tasks.id as id', 'projects.project_name as project_name', 'projects.description as description', 'tasks.task_description as task_description', 'tasks.task_notes as task_notes', 'tasks.completed as completed')
        .where({ project_id: id })
}

module.exports = {
    find,
    add,
    findTasks
};