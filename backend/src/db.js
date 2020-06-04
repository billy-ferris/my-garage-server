const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV;
const connectionConfig = knexConfig[environment] || 'development';

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;
