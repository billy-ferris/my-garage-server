const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  url,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.vehicle, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.make);
    references(table, tableNames.model);
    references(table, tableNames.submodel);
    references(table, tableNames.model_year, true, 'year_id');
    table.string('color', 100);
    addDefaultColumns(table);
  });

  await Promise.all([
    knex.schema.createTable(tableNames.vehicle_info, (table) => {
      table.increments();
      references(table, tableNames.vehicle);
      table.dateTime('purchase_date');
      // does purchase price need to be not nullable and have default??
      table.float('purchase_price');
      table.float('msrp');
      references(table, tableNames.ownership_status);
      references(table, tableNames.build_type, false);
      table.integer('mileage_bought_at').unsigned();
      table.integer('mileage_at').unsigned();
      table.float('sold_price');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.vehicle_spec, (table) => {
      table.increments();
      references(table, tableNames.vehicle);
      table.string('name').notNullable();
      table.string('value').notNullable();
      table.string('unit');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.vehicle_image, (table) => {
      table.increments();
      url(table, 'image_url').notNullable();
      references(table, tableNames.vehicle);
      references(table, tableNames.image_type);
      addDefaultColumns(table);
    }),
  ]);
};

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.dropTableIfExists(tableNames.vehicle_image),
    knex.schema.dropTableIfExists(tableNames.vehicle_spec),
    knex.schema.dropTableIfExists(tableNames.vehicle_info),
  ]);

  await knex.schema.dropTableIfExists(tableNames.vehicle);
};
