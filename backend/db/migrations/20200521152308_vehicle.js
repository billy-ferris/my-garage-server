const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  email,
  url,
  createNameTable,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {};

exports.down = async (knex) => {};
