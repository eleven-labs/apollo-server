'use strict';

const axios = require('axios');
const _progress = require('cli-progress');

class AstronautSeeder {

    static async run(knex) {
        const bar = new _progress.Bar();

        await knex('astronaut').del();

        const planets = await knex('planet').select('*');

        const
            numberResult = 500,
            numberIteration = 3;


        bar.start(numberResult * numberIteration, 0, {
            speed: "N/A"
        });

        let promises = [];
        Array.from(Array(numberIteration).keys()).forEach((i) => {
            const promise = new Promise((resolve, reject) => {
                const axiosPromise = axios.get(`https://randomuser.me/api/?results=${numberResult}&nat=fr`)
                    .then(({ data: { results } }) => {
                        const astronauts = results.reduce((acc, astronaut) => {
                            const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
                            acc.push({
                                username: astronaut.login.username,
                                picture: astronaut.picture.medium,
                                planet_id: randomPlanet.id,
                            });
                            return acc;
                        }, []);

                        bar.increment(numberResult);
                        return knex('astronaut').insert(astronauts);
                    })
                    .catch(() => null);

                resolve(axiosPromise);
            });

            promises.push(promise);
        });

        await Promise.all(promises)
            .then(() => {
                bar.stop();
            });
    }
}

exports.seed = AstronautSeeder.run;