const { Model } = require('objection');

const tableNames = require('../../../../constants/tableNames');
const schema = require('./vehicle_spec.schema.json');

class VehicleSpec extends Model {
  static get tableName() {
    return tableNames.vehicle_spec;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = VehicleSpec;
