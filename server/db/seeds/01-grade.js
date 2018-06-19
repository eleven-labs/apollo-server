'use strict';

class GradeSeeder {

  static async run(knex) {
    await knex('grade').del();

    await knex('grade')
      .insert([
        {
          name: 'Rookie',
        },
        {
          name: 'Commander'
        },
        {
          name: 'Lieutenant'
        },
        {
          name: 'Amiral'
        }
      ]);
  }
}

exports.seed = GradeSeeder.run;