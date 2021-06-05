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
    references(table, tableNames.make);
    references(table, tableNames.model);
    references(table, tableNames.submodel);
    references(table, tableNames.model_year, true, 'year');
    addDefaultColumns(table);
    table.unique(['make_id', 'model_id', 'submodel_id', 'year_id']);
  });

  await Promise.all([
    knex.schema.createTable(tableNames.vehicle_info, (table) => {
      table.increments();
      references(table, tableNames.user);
      references(table, tableNames.vehicle);
      table.string('color', 50);
      table.dateTime('purchase_date');
      table.float('purchase_price');
      table.float('msrp');
      references(table, tableNames.ownership_status);
      references(table, tableNames.build_type, false);
      table.integer('mileage_bought_at').unsigned();
      table.integer('mileage_at').unsigned();
      table.dateTime('sold_date');
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

/**
 * @param {import('knex')} knex
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.vehicle_spec,
      tableNames.vehicle_image,
      tableNames.vehicle_info,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );

  await knex.schema.dropTableIfExists(tableNames.vehicle);
};
