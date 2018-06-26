'use strict';

const resolvers = {
    Query: {
        planets: (root, args, { db }, infos) => db.planet.query(),
        planet: (root, { id }, { db }, infos) => db.planet.query().findById(id),
    },
    Planet: {
        astronauts: ({ id: planetId }, args, { dataloaders }, infos) => dataloaders.astronautsByPlanetId.load(planetId),
    },
}

module.exports = resolvers;