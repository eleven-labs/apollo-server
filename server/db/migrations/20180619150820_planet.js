'use strict';

const PlanetSchema = {
    up: (knex, Promise) => {
        return Promise.all([
            knex.schema.createTable('planet', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('name');
                table.string('picture').notNullable();
                table.integer('points').notNullable().defaultTo(0);
            })
        ]);
    },
    down: (knex, Promise) => {
        return Promise.all([
            knex.schema.dropTable('planet')
        ]);
    }
}

module.exports = PlanetSchema;