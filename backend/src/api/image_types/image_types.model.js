const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');

const schema = require('./image_type.schema.json');

class ImageType extends Model {
  static get tableName() {
    return tableNames.image_type;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = ImageType;
