'use strict';

const Seeder = require('../seeder');
const User = require('../../models/user');

class UserSeeder extends Seeder {

    static async run(knex) {
        const seeder = new UserSeeder(knex);

        await User.query().delete();

        await User.query()
            .insert({
                'firstname': 'Wilson',
                'lastname': 'Eleven',
                'email': 'wilson@eleven-labs.com',
                'password': 'wilson'
            });
    }
}

exports.seed = UserSeeder.run;