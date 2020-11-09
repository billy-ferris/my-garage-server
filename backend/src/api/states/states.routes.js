const express = require('express');

const queries = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const states = await queries.find();
    res.json(states);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const state = await queries.get(parseInt(id, 10) || 0);
    if (state) {
      res.json(state);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
