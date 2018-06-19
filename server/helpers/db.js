'use strict';

const knex = require('../database');
const { Model } = require('objection');

const Db = () => {
    Model.knex(knex);

    const db = {
        astronaut: require('../models/astronaut'),
        grade: require('../models/grade'),
        planet: require('../models/planet')
    };

    return db;
};

module.exports = Db;