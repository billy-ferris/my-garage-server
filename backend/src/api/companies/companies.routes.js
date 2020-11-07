const express = require('express');

const Company = require('./companies.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.query().where('deleted_at', null);
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const company = await Company.query().insert(req.body);
    if (company) {
      res.json(company);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const company = await Company.query().patchAndFetchById(
      req.params.id,
      req.body
    );
    res.json(company);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
