const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  url,
  references,
  description,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.part, (table) => {
    table.increments();
    references(table, tableNames.vehicle);
    table.string('name').notNullable();
    description(table, 'description');
    references(table, tableNames.part_category);
    references(table, tableNames.company, true, 'part_manufacturer');
    table.string('part_num', 100);
    addDefaultColumns(table);
  });

  await Promise.all([
    knex.schema.createTable(tableNames.part_info, (table) => {
      table.increments();
      references(table, tableNames.part);
      table.dateTime('purchase_date');
      table.float('purchase_price');
      table.dateTime('install_date');
      table.float('install_price');
      url(table, 'purchased_from');
      table.string('installed_by');
      references(table, tableNames.company, false, 'installer');
      references(table, tableNames.part_status);
      table.integer('installed_at').unsigned();
      description(table, 'note');
      table.float('sold_price');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.part_image, (table) => {
      table.increments();
      url(table, 'image_url').notNullable;
      references(table, tableNames.part);
      references(table, tableNames.image_type);
    }),
  ]);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableNames.part_info),
    knex.schema.dropTableIfExists(tableNames.part_image),
  ]);

  await knex.schema.dropTableIfExists(tableNames.part);
};
