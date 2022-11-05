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

let models = Papa.parse(csvData, {
  header: true,
});

models = models.data.map(({ make: make_id, model: name }) => ({
  make_id,
  name,
}));

module.exports = createUniqueArr(models);
