'use strict';

const AstronautSchema = {
    up: (knex, Promise) => {
        return Promise.all([
            knex.schema.createTable('astronaut', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('username').notNullable();
                table.string('picture');
                table.integer('grade_id');
                table.foreign('grade_id').references('grade.id').onDelete('SET NULL').onUpdate('CASCADE');
                table.integer('planet_id');
                table.foreign('planet_id').references('planet.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        ]);
    },
    down: (knex, Promise) => {
        return Promise.all([
            knex.schema.dropTable('astronaut')
        ]);
    }
}

module.exports = AstronautSchema;