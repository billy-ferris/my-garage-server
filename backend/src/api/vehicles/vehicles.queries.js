const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  `${tableNames.vehicle}.id`,
  `${tableNames.vehicle}.user_id`,
  `${tableNames.make}.name as make`,
  `${tableNames.model}.name as model`,
  `${tableNames.submodel}.name as submodel`,
  `${tableNames.model_year}.year_num as year`,
  `${tableNames.vehicle}.created_at`,
  `${tableNames.vehicle}.updated_at`,
];

module.exports = {
  getAllVehicles() {
    return db(tableNames.vehicle)
      .select(fields)
      .where({
        'vehicle.deleted_at': null,
      })
      .innerJoin('make', 'make.id', 'vehicle.make_id')
      .innerJoin('model', 'model.id', 'vehicle.model_id')
      .innerJoin('submodel', 'submodel.id', 'vehicle.submodel_id')
      .innerJoin('model_year', 'model_year.id', 'vehicle.year_id');
  },

  getVehicleById(id) {
    return db(tableNames.vehicle)
      .select(fields)
      .where({
        'vehicle.id': id,
      })
      .andWhere({
        'vehicle.deleted_at': null,
      })
      .first()
      .innerJoin('make', 'make.id', 'vehicle.make_id')
      .innerJoin('model', 'model.id', 'vehicle.model_id')
      .innerJoin('submodel', 'submodel.id', 'vehicle.submodel_id')
      .innerJoin('model_year', 'model_year.id', 'vehicle.year_id');
  },
};
