const db = require('../data/db-config.js');

function find() {
    return db('resources');
}

function add(resource) {
    return db('resources')
        .insert(resource)
        .then(res => {
            const id = res[0];
            return db("resources").where({ id });
          });
}

module.exports = {
    find,
    add
};