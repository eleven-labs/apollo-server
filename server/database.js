'use strict';

const config = require('./knexfile');
const environment = process.env.NODE_ENV || 'dev';

const Database = require('knex')({
    ...config[environment],
    pool: { min: 0, max: 7 }
});

module.exports = Database;