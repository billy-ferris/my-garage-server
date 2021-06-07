const express = require('express');

const Vehicle = require('./vehicles.model');
const vehicleInfos = require('./vehicle_infos/vehicle_infos.routes');
const tableNames = require('../../constants/tableNames');

const router = express.Router({ mergeParams: true });

const fields = [
  `${tableNames.vehicle}.id`,
  `${tableNames.make}.name as make`,
  `${tableNames.model}.name as model`,
  `${tableNames.submodel}.name as submodel`,
  `${tableNames.model_year}.year_num as year`,
  `${tableNames.vehicle}.created_at`,
  `${tableNames.vehicle}.updated_at`,
];

router.use('/:vehicle_id/vehicle_infos', vehicleInfos);

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.query()
      .select(fields)
      .where({
        'vehicle.deleted_at': null,
      })
      .innerJoin('make', 'make.id', 'vehicle.make_id')
      .innerJoin('model', 'model.id', 'vehicle.model_id')
      .innerJoin('submodel', 'submodel.id', 'vehicle.submodel_id')
      .innerJoin('model_year', 'model_year.id', 'vehicle.year_id');
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.query()
      .select(fields)
      .where({ 'vehicle.id': id })
      .andWhere({
        'vehicle.deleted_at': null,
      })
      .innerJoin('make', 'make.id', 'vehicle.make_id')
      .innerJoin('model', 'model.id', 'vehicle.model_id')
      .innerJoin('submodel', 'submodel.id', 'vehicle.submodel_id')
      .innerJoin('model_year', 'model_year.id', 'vehicle.year_id');
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
    if (vehicle) {
      res.json(vehicle);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.query().patchAndFetchById(req.params.id, {
      deleted_at: new Date().toISOString(),
    });
    if (vehicle) {
      res.json(vehicle);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
