'use strict';

const axios = require('axios');

class AstronautSeeder {

    static async run(knex) {
        await knex('astronaut').del();

        const grades = await knex('grade').select('*');
        const planets = await knex('planet').select('*');

        const { data: { results } } = await axios.get('https://randomuser.me/api/?results=20&nat=fr');
        const astronauts = results.reduce((acc, astronaut) => {
            const 
                randomGrad = grades[Math.floor(Math.random() * grades.length)],
                randomPlanet = planets[Math.floor(Math.random() * planets.length)];
            acc.push({
                username: astronaut.login.username,
                picture: astronaut.picture.medium,
                grade_id: randomGrad.id,
                planet_id: randomPlanet.id,
            });
            return acc;
        }, []);

        await knex('astronaut')
            .insert(astronauts);
    }
}

exports.seed = AstronautSeeder.run;