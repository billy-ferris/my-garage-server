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

let makes = Papa.parse(csvData, {
  header: true,
});

makes = makes.data.map(({ make: name }) => ({
  name,
}));

module.exports = createUniqueArr(makes);
