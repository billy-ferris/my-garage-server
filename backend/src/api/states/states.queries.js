const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const fields = [
  `${tableNames.state}.id`,
  `${tableNames.state}.name`,
  `${tableNames.state}.code`,
  `${tableNames.country}.code as country`,
];

module.exports = {
  find() {
    // TODO: filter by country
    return db(tableNames.state)
      .select(fields)
      .innerJoin('country', 'country.id', 'state.country_id');
  },

  get(id) {
    return db(tableNames.state)
      .select(fields)
      .where({
        'state.id': id,
      })
      .first()
      .innerJoin('country', 'country.id', 'state.country_id');
  },
};
