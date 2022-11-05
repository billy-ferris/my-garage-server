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

let years = Papa.parse(csvData, {
  header: true,
});

years = years.data.map(({ year: year_num, model: model_id }) => ({
  year_num,
  model_id,
}));

module.exports = createUniqueArr(years);
