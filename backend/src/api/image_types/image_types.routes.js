const express = require('express');

const ImageType = require('./image_types.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const imageTypes = await ImageType.query().where('deleted_at', null);
    res.json(imageTypes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const imageType = await ImageType.query()
      .where({ id })
      .andWhere('deleted_at', null);
    res.json(imageType);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const imageType = await ImageType.query().insert(req.body);
    if (imageType) {
      res.json(imageType);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const imageType = await ImageType.query().patchAndFetchById(req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString(),
    });
    res.json(imageType);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const imageType = await ImageType.query().patchAndFetchById(req.params.id, {
      deleted_at: new Date().toISOString(),
    });
    res.json(imageType);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
