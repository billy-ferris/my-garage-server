const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const { createNameTable, references } = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await createNameTable(knex, tableNames.make);

  await knex.schema.createTable(tableNames.model, (table) => {
    table.increments();
    table.string('name').notNullable();
    references(table, tableNames.make);
  });

  await knex.schema.createTable(tableNames.submodel, (table) => {
    table.increments();
    table.string('name').notNullable();
    references(table, tableNames.model);
  });

  await knex.schema.createTable(tableNames.model_year, (table) => {
    table.increments();
    table.integer('year_num').notNullable();
    references(table, tableNames.model);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.model_year, tableNames.submodel].map((tableName) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );

  await knex.schema.dropTableIfExists(tableNames.model);
  await knex.schema.dropTableIfExists(tableNames.make);
};
