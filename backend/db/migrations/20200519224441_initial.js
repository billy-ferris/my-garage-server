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
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments();
      email(table, 'email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    createNameTable(knex, tableNames.ownership_status),
    createNameTable(knex, tableNames.build_type),
    createNameTable(knex, tableNames.part_category),
    createNameTable(knex, tableNames.part_status),
    createNameTable(knex, tableNames.record_type),
    createNameTable(knex, tableNames.image_type),
    knex.schema.createTable(tableNames.part_manufacturer, (table) => {
      table.increments();
      table.string('name', 128).notNullable().unique();
      url(table, 'logo_url');
      url(table, 'website_url');
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.country, (table) => {
      table.increments();
      table.string('name').notNullable().unique();
      table.string('code');
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.state, (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('code');
    references(table, tableNames.country);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments();
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    references(table, tableNames.state, false);
    references(table, tableNames.country);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.address);
  await knex.schema.dropTableIfExists(tableNames.state);

  await Promise.all(
    [
      tableNames.user,
      tableNames.record_type,
      tableNames.part_status,
      tableNames.part_manufacturer,
      tableNames.part_category,
      tableNames.ownership_status,
      tableNames.country,
      tableNames.build_type,
      tableNames.image_type,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};