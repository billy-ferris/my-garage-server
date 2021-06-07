const express = require('express');

const VehicleInfo = require('./vehicle_infos.model');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  try {
    const vehicleInfos = await VehicleInfo.query().where('deleted_at', null);
    res.json(vehicleInfos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicleInfo = await VehicleInfo.query()
      .where({ id })
      .andWhere('deleted_at', null);
    // TODO: best way to return error and not empty array if id is not found? - applies to all get by IDs
    if (vehicleInfo.length > 0) {
      res.json(vehicleInfo);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { vehicle_id } = req.params;

  try {
    // TODO: get user_id from logged in user
    const vehicleInfo = await VehicleInfo.query().insert({
      vehicle_id: Number(vehicle_id),
      ...req.body,
    });
    if (vehicleInfo) {
      res.json(vehicleInfo);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const vehicleInfo = await VehicleInfo.query().patchAndFetchById(
      req.params.id,
      {
        ...req.body,
        updated_at: new Date().toISOString(),
      }
    );
    if (vehicleInfo) {
      res.json(vehicleInfo);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const vehicleInfo = await VehicleInfo.query().patchAndFetchById(
      req.params.id,
      {
        deleted_at: new Date().toISOString(),
      }
    );
    if (vehicleInfo) {
      res.json(vehicleInfo);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
