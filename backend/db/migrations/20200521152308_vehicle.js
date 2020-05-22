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
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.vehicle, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.make);
    references(table, tableNames.model);
    references(table, tableNames.submodel);
    references(table, tableNames.model_year, true, 'year_id');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.vehicle_info, (table) => {
    table.increments();
    references(table, tableNames.vehicle);
    table.dateTime('purchase_date').notNullable();
    table.float('purchase_price').notNullable().defaultTo(0);
    table.float('msrp');
    references(table, tableNames.ownership_status);
    references(table, tableNames.build_type);
    table.integer('mileage_bought_at').notNullable().unsigned();
    table.integer('mileage_at').unsigned();
    table.float('sold_price');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.vehicle_spec, (table) => {
    table.increments();
    references(table, tableNames.vehicle);
    table.string('name').notNullable();
    table.string('value').notNullable();
    table.string('unit');
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.vehicle_spec);
  await knex.schema.dropTableIfExists(tableNames.vehicle_info);
  await knex.schema.dropTableIfExists(tableNames.vehicle);
};
