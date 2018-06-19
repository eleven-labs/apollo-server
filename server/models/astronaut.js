'use strict';

const { Model } = require('objection');
const Grade = require('./grade');

class Astronaut extends Model {

    async $beforeInsert(ctx) {
        super.$beforeInsert(ctx);
        const grade = await Grade.query().where({name: 'Rookie'}).first();
        this.grade_id = grade.id;
    }

    static get tableName() {
        return 'astronaut';
    }
}

module.exports = Astronaut;