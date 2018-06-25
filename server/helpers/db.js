'use strict';

const knex = require('../database');
const { Model } = require('objection');

const Db = () => {
    Model.knex(knex);

    const db = {
        astronaut: require('../models/astronaut'),
        planet: require('../models/planet'),
        user: require('../models/user'),
    };

    return db;
};

module.exports = Db;