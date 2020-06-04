const express = require('express');

const queries = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const states = await queries.find();
    if (states) {
      return res.json(states);
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const state = await queries.get(parseInt(id, 10) || 0);
    if (state) {
      return res.json(state);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
