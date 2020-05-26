const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'baf62495@aol.com',
    name: 'Billy',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user).insert(user, '*');

  if (process.env.NODE_ENV !== 'test') {
    console.log(
      'User created:',
      {
        password,
      },
      createdUser
    );
  }
};
