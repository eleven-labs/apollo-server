'use strict';

const { Model } = require('objection');

class Astronaut extends Model {
    static get tableName() {
        return 'astronaut';
    }
}

module.exports = Astronaut;