const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  `${tableNames.country}.id`,
  `${tableNames.country}.name`,
  `${tableNames.country}.code`,
];

module.exports = {
  getAllCountries() {
    return db(tableNames.country).select(fields);
  },

  getCountryById(id) {
    return db(tableNames.country)
      .select(fields)
      .where({
        'country.id': id,
      })
      .first();
  },
};
