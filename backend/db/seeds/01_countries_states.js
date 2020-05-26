const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const countries = require('../../src/constants/countries');
const us_states = require('../../src/constants/us_states');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedCountries = await knex(tableNames.country).insert(
    countries,
    '*'
  );

  const usa = insertedCountries.find((country) => country.code === 'US');

  us_states.forEach((state) => {
    state.country_id = usa.id;
  });

  await knex(tableNames.state).insert(us_states);
};
