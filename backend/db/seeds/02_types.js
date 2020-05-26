const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const build_types = require('../../src/constants/build_types');
const image_types = require('../../src/constants/image_types');
const record_types = require('../../src/constants/record_types');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex(tableNames.build_type).insert(build_types);
  await knex(tableNames.image_type).insert(image_types);
  await knex(tableNames.record_type).insert(record_types);
};
