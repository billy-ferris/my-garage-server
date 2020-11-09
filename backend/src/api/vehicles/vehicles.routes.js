const express = require('express');

const Vehicle = require('./vehicles.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.query().where('deleted_at', null);
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.query()
      .where({ id })
      .andWhere('deleted_at', null);
    if (vehicle) {
      res.json(vehicle);
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.query().insert(req.body);
    if (vehicle) {
      res.json(vehicle);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
