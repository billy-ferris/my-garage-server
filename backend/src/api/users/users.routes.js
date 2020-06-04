const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await User.query();
  res.json(users);
});

module.exports = router;
