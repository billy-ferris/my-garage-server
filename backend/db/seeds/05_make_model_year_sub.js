const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const { getIDByName } = require('../../src/lib/dataUtils');

const makes = require('../../src/constants/sample-data/makes_sample');
const models = require('../../src/constants/sample-data/models_sample');
const submodels = require('../../src/constants/sample-data/submodels_sample');
const years = require('../../src/constants/sample-data/model_years_sample');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertedMakes = await knex(tableNames.make).insert(makes, '*');

  models.forEach((model) => {
    model.make_id = getIDByName(insertedMakes, model.make_id);
  });

  const insertedModels = await knex(tableNames.model).insert(models, '*');

  submodels.forEach((submodel) => {
    submodel.model_id = getIDByName(insertedModels, submodel.model_id);
  });

  years.forEach((year) => {
    year.model_id = getIDByName(insertedModels, year.model_id);
  });

  await Promise.all([
    knex(tableNames.submodel).insert(submodels),
    knex(tableNames.model_year).insert(years),
  ]);
};
