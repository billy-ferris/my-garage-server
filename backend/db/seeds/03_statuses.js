const tableNames = require('../../src/constants/tableNames');
const ownership_statuses = require('../../src/constants/ownership_statuses');
const part_statuses = require('../../src/constants/part_statuses');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.ownership_status).insert(ownership_statuses);
  await knex(tableNames.part_status).insert(part_statuses);
};
