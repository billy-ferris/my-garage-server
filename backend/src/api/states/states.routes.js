// TODO: refactor using objection queries
const express = require('express');

const queries = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { country_id, country_code } = req.query;
  try {
    const states = await queries.getAllStates();
    if (country_id) {
      const statesByCountryId = await queries.getStatesByCountryId(country_id);
      res.json(statesByCountryId);
      return;
    }
    // TODO: need to get query working properly
    if (country_code) {
      const statesByCountryCode = await queries.getStatesByCountryCode(
        country_code
      );
      res.json(statesByCountryCode);
      return;
    }
    res.json(states);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const state = await queries.getStateById(parseInt(id, 10) || 0);
    if (state) {
      res.json(state);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
