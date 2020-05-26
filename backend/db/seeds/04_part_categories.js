const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const part_categories = require('../../src/constants/part_categories');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  knex(tableNames.part_category).insert(part_categories);
};
