const express = require('express');

const Make = require('./makes.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const makes = await Make.query().where('deleted_at', null);
    res.json(makes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const make = await Make.query().where({ id }).andWhere('deleted_at', null);
    res.json(make);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
