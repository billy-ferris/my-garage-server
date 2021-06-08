const express = require('express');

const VehicleSpec = require('./vehicle_specs.model');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  try {
    const vehicleSpecs = await VehicleSpec.query().where('deleted_at', null);
    res.json(vehicleSpecs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicleSpec = await VehicleSpec.query()
      .where({ id })
      .andWhere('deleted_at', null);
    res.json(vehicleSpec);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { vehicle_info_id } = req.params;

  try {
    const vehicleSpec = await VehicleSpec.query().insert({
      vehicle_info_id: Number(vehicle_info_id),
      ...req.body,
    });
    if (vehicleSpec) {
      res.json(vehicleSpec);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const vehicleSpec = await VehicleSpec.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      }
    );
    if (vehicleSpec) {
      res.json(vehicleSpec);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const vehicleSpec = await VehicleSpec.query().patchAndFetchById(
      req.params.id,
      {
        deleted_at: new Date().toISOString(),
      }
    );
    if (vehicleSpec) {
      res.json(vehicleSpec);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
