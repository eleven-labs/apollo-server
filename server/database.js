'use strict';

const config = require('./knexfile');
const dbLogger = require('./helpers/db-logger');
const util = require('util');
const logger = require('./helpers/logger');
const environment = process.env.NODE_ENV || 'dev';

const Database = require('knex')({
    ...config[environment],
    pool: { min: 0, max: 7 }
});

module.exports = dbLogger(Database, {
    logger: (message, ...optionalParams) => {
        logger.log('info', util.format(message, ...optionalParams));
    }
});