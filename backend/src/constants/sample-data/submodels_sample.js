const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const { createUniqueArr } = require('../../lib/dataUtils');

const csvData = fs.readFileSync(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'db',
    'sources',
    'vehicle_sample_data.csv'
  ),
  'utf8'
);

let submodels = Papa.parse(csvData, {
  header: true,
});

submodels = submodels.data.map(({ submodel: name, model: model_id }) => ({
  name,
  model_id,
}));

module.exports = createUniqueArr(submodels);
