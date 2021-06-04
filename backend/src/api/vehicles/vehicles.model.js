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

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Make = require('../makes/makes.model');

    return {
      make: {
        relation: Model.BelongsToOneRelation,
        modelClass: Make,
        join: {
          from: 'vehicle.make_id',
          to: 'make.id',
        },
      },
    };
  }
}

module.exports = Vehicle;
