const express = require('express');

const BuildType = require('./build_types.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const buildTypes = await BuildType.query().where('deleted_at', null);
    res.json(buildTypes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const buildType = await BuildType.query()
      .where({ id })
      .andWhere('deleted_at', null);
    res.json(buildType);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const buildType = await BuildType.query().insert(req.body);
    if (buildType) {
      res.json(buildType);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const buildType = await BuildType.query().patchAndFetchById(req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString(),
    });
    res.json(buildType);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const buildType = await BuildType.query().patchAndFetchById(req.params.id, {
      deleted_at: new Date().toISOString(),
    });
    res.json(buildType);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
