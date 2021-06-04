const express = require('express');

const Address = require('./addresses.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const addresses = await Address.query().where('deleted_at', null);
    res.json(addresses);
    return;
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const address = await Address.query()
      .where({ id })
      .andWhere('deleted_at', null);
    if (address) {
      res.json(address);
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    ['street_address_1', 'street_address_2', 'city', 'zipcode'].forEach(
      (prop) => {
        if (req.body[prop]) {
          req.body[prop] = req.body[prop].toString().toLowerCase().trim();
        }
      }
    );
    const address = await Address.query().insert(req.body);
    res.json(address);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    ['street_address_1', 'street_address_2', 'city', 'zipcode'].forEach(
      (prop) => {
        if (req.body[prop]) {
          req.body[prop] = req.body[prop].toString().toLowerCase().trim();
        }
      }
    );
    const address = await Address.query().patchAndFetchById(req.params.id, {
      ...req.body,
      updated_at: new Date().toISOString(),
    });
    res.json(address);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const address = await Address.query().patchAndFetchById(req.params.id, {
      deleted_at: new Date().toISOString(),
    });
    res.json(address);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
