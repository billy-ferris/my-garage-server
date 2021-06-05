const { Model } = require('objection');

const tableNames = require('../../../constants/tableNames');
const schema = require('./vehicle_info.schema.json');

class VehicleInfo extends Model {
  static get tableName() {
    return tableNames.vehicle_info;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = VehicleInfo;
