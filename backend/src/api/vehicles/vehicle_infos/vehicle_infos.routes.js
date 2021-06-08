const express = require('express');

const VehicleInfo = require('./vehicle_infos.model');
const vehicleSpecs = require('./vehicle_specs/vehicle_specs.routes');
const tableNames = require('../../../constants/tableNames');

const router = express.Router({ mergeParams: true });

const fields = [
  `${tableNames.vehicle_info}.id`,
  `${tableNames.vehicle_info}.user_id`,
  `${tableNames.vehicle_info}.color`,
  `${tableNames.vehicle_info}.purchase_date`,
  `${tableNames.vehicle_info}.purchase_price`,
  `${tableNames.vehicle_info}.msrp`,
  `${tableNames.ownership_status}.name as ownership_status`,
  `${tableNames.build_type}.name as build_type`,
  `${tableNames.vehicle_info}.mileage_bought_at`,
  `${tableNames.vehicle_info}.mileage_at`,
  `${tableNames.vehicle_info}.sold_date`,
  `${tableNames.vehicle_info}.sold_price`,
];

const vehicleFields = [
  `${tableNames.make}.name as make`,
  `${tableNames.model}.name as model`,
  `${tableNames.submodel}.name as submodel`,
  `${tableNames.model_year}.year_num as year`,
];

const specFields = [
  `${tableNames.vehicle_spec}.name`,
  `${tableNames.vehicle_spec}.value`,
  `${tableNames.vehicle_spec}.unit`,
];

router.use('/:vehicle_info_id/vehicle_specs', vehicleSpecs);

router.get('/', async (req, res, next) => {
  try {
    const vehicleInfos = await VehicleInfo.query()
      .select(fields)
      .innerJoin(
        `${tableNames.ownership_status}`,
        `${tableNames.vehicle_info}.id`,
        `${tableNames.ownership_status}.id`
      )
      .innerJoin(
        `${tableNames.build_type}`,
        `${tableNames.vehicle_info}.id`,
        `${tableNames.build_type}.id`
      )
      .withGraphJoined('[vehicle(joinVehicle), specs(selectSpecFields)]')
      .modifiers({
        joinVehicle: (builder) => {
          builder
            .innerJoin(
              `${tableNames.make}`,
              `${tableNames.vehicle}.id`,
              `${tableNames.make}.id`
            )
            .innerJoin(
              `${tableNames.model}`,
              `${tableNames.model}.id`,
              `${tableNames.vehicle}.model_id`
            )
            .innerJoin(
              `${tableNames.submodel}`,
              `${tableNames.submodel}.id`,
              `${tableNames.vehicle}.submodel_id`
            )
            .innerJoin(
              `${tableNames.model_year}`,
              `${tableNames.model_year}.id`,
              `${tableNames.vehicle}.year_id`
            )
            .select(vehicleFields);
        },
        selectSpecFields: (builder) => {
          builder.select(specFields).where('deleted_at', null);
        },
      })
      .andWhere('vehicle_info.deleted_at', null);
    // .andWhere('specs.deleted_at', null);
    res.json(vehicleInfos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicleInfo = await VehicleInfo.query()
      .select(fields)
      .innerJoin(
        `${tableNames.ownership_status}`,
        `${tableNames.vehicle_info}.id`,
        `${tableNames.ownership_status}.id`
      )
      .innerJoin(
        `${tableNames.build_type}`,
        `${tableNames.vehicle_info}.id`,
        `${tableNames.build_type}.id`
      )
      .withGraphJoined({ specs: true, vehicle: true })
      .modifyGraph('vehicle', (builder) => {
        builder
          .innerJoin(
            `${tableNames.make}`,
            `${tableNames.vehicle}.id`,
            `${tableNames.make}.id`
          )
          .innerJoin(
            `${tableNames.model}`,
            `${tableNames.model}.id`,
            `${tableNames.vehicle}.model_id`
          )
          .innerJoin(
            `${tableNames.submodel}`,
            `${tableNames.submodel}.id`,
            `${tableNames.vehicle}.submodel_id`
          )
          .innerJoin(
            `${tableNames.model_year}`,
            `${tableNames.model_year}.id`,
            `${tableNames.vehicle}.year_id`
          )
          .select(vehicleFields);
      })
      .where('vehicle_info.id', id)
      .andWhere('vehicle_info.deleted_at', null)
      .andWhere('specs.deleted_at', null);
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
