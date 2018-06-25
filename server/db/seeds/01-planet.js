'use strict';

class PlanetSeeder {

  static async run(knex) {
    await knex('planet').del();

    await knex('planet')
      .insert([
        {
          name: 'Duck Invaders',
          picture: "https://planets-bo.eleven-labs.com/uploads/images/planet/587748b26f93a.png"
        },
        {
          name: 'Donut Factory',
          picture: "https://planets-bo.eleven-labs.com/uploads/images/planet/planete-donut.png"
        },
        {
          name: 'Raccoons Asgard',
          picture: "https://planets-bo.eleven-labs.com/uploads/images/planet/587748c0bc435.png"
        },
        {
          name: 'Schizo CatsD',
          picture: "https://planets-bo.eleven-labs.com/uploads/images/planet/planete-Skizo.png"
        }
      ]);
  }
}

exports.seed = PlanetSeeder.run;