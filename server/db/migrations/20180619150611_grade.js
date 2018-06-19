'use strict';

const GradeSchema = {
    up: (knex, Promise) => {
        return Promise.all([
            knex.schema.createTable('grade', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('name').notNullable();

            })
        ]);
    },
    down: (knex, Promise) => {
        return Promise.all([
            knex.schema.dropTable('grade')
        ]);
    }
}

module.exports = GradeSchema;