const knex = require('knex');

const knexConfig = require('../knexfile');
const environment = process.env.NODE_ENV;
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

module.exports = connection;
