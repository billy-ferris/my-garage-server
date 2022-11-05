const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.query()
      .select('id', 'email', 'name', 'created_at', 'updated_at')
      .where('deleted_at', null);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.query()
      .select('id', 'email', 'name', 'created_at', 'updated_at')
      .where({ id })
      .andWhere('deleted_at', null);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
