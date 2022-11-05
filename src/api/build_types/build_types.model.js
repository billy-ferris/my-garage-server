const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');

const schema = require('./build_type.schema.json');

class BuildType extends Model {
  static get tableName() {
    return tableNames.build_type;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = BuildType;
