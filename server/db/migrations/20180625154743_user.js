'use strict';

const UserSchema = {
    up: (knex, Promise) => {
        return Promise.all([
            knex.schema.createTable('user', table => {
                table.increments();
                table.timestamps(true, true);
                table.string('firstname');
                table.string('lastname');
                table.string('email').notNullable();
                table.unique('email')
                table.string('password').notNullable();

            })
        ]);
    },
    down: (knex, Promise) => {
        return Promise.all([
            knex.schema.dropTable('user')
        ]);
    }
}

module.exports = UserSchema;