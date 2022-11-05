const tableNames = require('../../src/constants/tableNames');
const {
  createNameTable,
  references,
  addDefaultColumns,
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await createNameTable(knex, tableNames.make);

  await knex.schema.createTable(tableNames.model, (table) => {
    table.increments();
    table.string('name').notNullable();
    references(table, tableNames.make);
    addDefaultColumns(table);
  });

  await Promise.all([
    knex.schema.createTable(tableNames.submodel, (table) => {
      table.increments();
      table.string('name').notNullable();
      references(table, tableNames.model);
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.model_year, (table) => {
      table.increments();
      table.integer('year_num').notNullable();
      references(table, tableNames.model);
      addDefaultColumns(table);
    }),
  ]);
};

/**
 * @param {import('knex')} knex
 */
exports.down = async (knex) => {
  await Promise.all(
    [tableNames.model_year, tableNames.submodel].map((tableName) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );

  await knex.schema.dropTableIfExists(tableNames.model);
  await knex.schema.dropTableIfExists(tableNames.make);
};
