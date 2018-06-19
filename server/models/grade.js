'use strict';

const { Model } = require('objection');

class Grade extends Model {
    static get tableName() {
        return 'grade';
    }
}

module.exports = Grade;