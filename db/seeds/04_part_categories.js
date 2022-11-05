const tableNames = require('../../src/constants/tableNames');
const part_categories = require('../../src/constants/part_categories');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.part_category).insert(part_categories);
};
