'use strict';

const PlanetOps = (root, { id: planetId }, { db }, infos) => ({
    addAstronaut: async ({ id: astronautId }) => {
        console.log(planetId, astronautId);
        await db.astronaut.query().patchAndFetchById(astronautId, { planet_id: planetId });
        return db.planet.query().findById(planetId);
    },
    removeAstronaut: async ({ id: astronautId }) => {
        await db.astronaut.query().patchAndFetchById(astronautId, { planet_id: null });
        return db.planet.query().findById(planetId);
    },
});

const resolvers = {
    Query: {
        planets: (root, args, { db }, infos) => db.planet.query(),
        planet: (root, { id }, { db }, infos) => db.planet.query().findById(id),
    },
    Planet: {
        astronauts: ({ id: planetId }, args, { dataloaders }, infos) => dataloaders.astronautsByPlanetId.load(planetId),
    },
    Mutation: {
        planet: PlanetOps
    }
}

module.exports = resolvers;