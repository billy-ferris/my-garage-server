const express = require('express');

const project = require('../constants/project');
const states = require('./states/states.routes');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');
const addresses = require('./addresses/addresses.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/states', states);
router.use('/users', users);
router.use('/auth', auth);
router.use('/addresses', addresses);

module.exports = router;
