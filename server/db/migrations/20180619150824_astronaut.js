'use strict';

const AstronautSchema = {
    up: (knex, Promise) => {
        return Promise.all([
            knex.schema.createTable('astronaut', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('username').notNullable();
                table.string('picture');
                table.enum('rank', [
                    'ROOKIE',
                    'ENSIGN',
                    'LIEUTENANT',
                    'LIEUTENANT_COMMANDER',
                    'COMMANDER',
                    'CAPTAIN',
                    'FLEET_CAPTAIN',
                    'COMMODORE',
                    'REAR_ADMIRAL',
                    'VICE_ADMIRAL',
                    'ADMIRAL',
                    'FLEET_ADMIRAL'
                ]).notNullable().defaultTo('ROOKIE');
                table.integer('points').notNullable().defaultTo(0);
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