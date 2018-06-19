'use strict';

const { Model } = require('objection');

class Planet extends Model {
    static get tableName() {
        return 'planet';
    }
}

module.exports = Planet;