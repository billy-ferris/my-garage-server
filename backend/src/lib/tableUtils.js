function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

function email(table, columnName) {
  return table.string(columnName, 254);
}

function url(table, columnName) {
  return table.string(columnName, 2000);
}

function description(table, columnName) {
  return table.string(columnName, 1000);
}

function createNameTable(knex, table_name) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
}

function references(table, tableName, notNullable = true, columnName = '') {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }
  return definition;
}

module.exports = {
  addDefaultColumns,
  email,
  url,
  createNameTable,
  references,
  description,
};
