const express = require('express');

const User = require('./addresses.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const addresses = await User.query().where('deleted_at', null);
    res.json(addresses);
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
    const address = await User.query().insert(req.body);
    res.json(address);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
