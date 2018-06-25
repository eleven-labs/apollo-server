'use strict';

const DataLoader = require('dataloader');
const db = require('../helpers/db')();

const planetById = (ids) =>
    db.planet.query().whereIn('id', ids)
        .then(planets => ids.map((id) => planets.find(({ id: currentId }) => id === currentId)));

const astronautById = (ids) =>
    db.astronaut.query().whereIn('id', ids)
        .then(astronauts => ids.map((id) => astronauts.find(({ id: currentId }) => id === currentId)));


const astronautsByPlanetId = (ids) =>
    db.astronaut.query().whereIn('planet_id', ids)
        .then(astronauts => ids.map((id) => astronauts.filter(({ planet_id }) => id === planet_id)));

module.exports = () => ({
    planetById: new DataLoader(planetById),
    astronautById: new DataLoader(astronautById),
    astronautsByPlanetId: new DataLoader(astronautsByPlanetId),
});