const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  url,
  references,
  description,
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.record, (table) => {
    table.increments();
    references(table, tableNames.vehicle_info);
    description(table, 'description');
    references(table, tableNames.record_type);
    addDefaultColumns(table);
  });

  await Promise.all([
    knex.schema.createTable(tableNames.record_info, (table) => {
      table.increments();
      references(table, tableNames.record);
      references(table, tableNames.company, false, 'location');
      description(table, 'summary');
      table.float('total_cost');
      table.integer('mileage').unsigned();
      table.dateTime('invoice_date').notNullable();
      table.string('invoice_num');
      description(table, 'note');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.record_image, (table) => {
      table.increments();
      url(table, 'image_url').notNullable();
      references(table, tableNames.record);
      references(table, tableNames.image_type);
      addDefaultColumns(table);
    }),
  ]);
};

/**
 * @param {import('knex')} knex
 */
exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableNames.record_info),
    knex.schema.dropTableIfExists(tableNames.record_image),
  ]);

  await knex.schema.dropTableIfExists(tableNames.record);
};
