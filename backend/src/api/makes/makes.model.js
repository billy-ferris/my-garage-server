const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');

const schema = require('./make.schema.json');

class BuildType extends Model {
  static get tableName() {
    return tableNames.make;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = BuildType;
