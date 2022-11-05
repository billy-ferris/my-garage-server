const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  `${tableNames.state}.id`,
  `${tableNames.state}.name`,
  `${tableNames.state}.code`,
  `${tableNames.country}.code as country`,
];

module.exports = {
  getAllStates() {
    return db(tableNames.state)
      .select(fields)
      .innerJoin('country', 'country.id', 'state.country_id');
  },

  getStatesByCountryId(id) {
    return db(tableNames.state)
      .select(fields)
      .where({ 'country.id': id })
      .innerJoin('country', 'country.id', 'state.country_id');
  },

  // TODO: Get working - insert country code lowercase in db?
  getStatesByCountryCode(code) {
    return db(tableNames.state)
      .select(fields)
      .where({ 'country.code': code.toLowerCase() })
      .innerJoin('country', 'country.id', 'state.country_id');
  },

  getStateById(id) {
    return db(tableNames.state)
      .select(fields)
      .where({
        'state.id': id,
      })
      .first()
      .innerJoin('country', 'country.id', 'state.country_id');
  },
};
