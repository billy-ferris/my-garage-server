const express = require('express');

const project = require('../constants/project');
const states = require('./states/states.routes');
const users = require('./users/users.routes');
const addresses = require('./addresses/addresses.routes');
const companies = require('./companies/companies.routes');
const auth = require('./auth/auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/states', states);
router.use('/users', users);
router.use('/addresses', addresses);
router.use('/companies', companies);
router.use('/auth', auth);

module.exports = router;
