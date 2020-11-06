const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.query().select('id', 'email', 'name', 'created_at', 'updated_at').where('deleted_at', null);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
