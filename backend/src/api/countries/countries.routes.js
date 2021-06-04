// TODO: refactor using objection queries
const express = require('express');

const queries = require('./countries.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const countries = await queries.getAllCountries();
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const country = await queries.getCountryById(parseInt(id, 10) || 0);
    if (country) {
      res.json(country);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
