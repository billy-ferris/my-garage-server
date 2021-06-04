const express = require('express');

const Vehicle = require('./vehicles.model');
const queries = require('./vehicles.queries');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await queries.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicle = await queries.getVehicleById(id);
    if (vehicle) {
      res.json(vehicle);
      return;
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
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.query().patchAndFetchById(req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString(),
    });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.query().patchAndFetchById(req.params.id, {
      deleted_at: new Date().toISOString(),
    });
    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
