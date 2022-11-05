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

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const VehicleSpec = require('./vehicle_specs/vehicle_specs.model');
    // eslint-disable-next-line global-require
    const Vehicle = require('../vehicles.model');

    return {
      specs: {
        relation: Model.HasManyRelation,
        modelClass: VehicleSpec,
        join: {
          from: 'vehicle_info.id',
          to: 'vehicle_spec.vehicle_info_id',
        },
      },
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'vehicle_info.vehicle_id',
          to: 'vehicle.id',
        },
      },
    };
  }
}

module.exports = VehicleInfo;
