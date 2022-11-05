const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./vehicle.schema.json');

class Vehicle extends Model {
  static get tableName() {
    return tableNames.vehicle;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Vehicle;
