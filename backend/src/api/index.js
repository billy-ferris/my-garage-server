const express = require('express');

const project = require('../constants/project');
const states = require('./states/states.routes');
const users = require('./users/users.routes');
const addresses = require('./addresses/addresses.routes');
const companies = require('./companies/companies.routes');
const vehicles = require('./vehicles/vehicles.routes');
const auth = require('./auth/auth.routes');
const buildTypes = require('./build_types/build_types.routes');
const imageTypes = require('./image_types/image_types.routes');
const countries = require('./countries/countries.routes');
const makes = require('./makes/makes.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/states', states);
router.use('/countries', countries);
router.use('/users', users);
router.use('/addresses', addresses);
router.use('/companies', companies);
router.use('/vehicles', vehicles);
router.use('/auth', auth);
router.use('/build_types', buildTypes);
router.use('/image_types', imageTypes);
router.use('/makes', makes);

module.exports = router;
