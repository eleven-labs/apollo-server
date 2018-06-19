'use strict';

const AstronautOps = (root, { id }, { db }, infos) => ({
    update: async ({ input }) => db.astronaut.query().patch({ ...input }).where({ id }).returning('*').then(rows => rows[0]),
    delete: () => db.astronaut.query().deleteById(id)
});

const resolvers = {
    Query: {
        astronauts: (root, args, { db }, infos) => db.astronaut.query(),
        astronaut: (root, { id }, { db }, infos) => db.astronaut.query().findById(id),
    },
    Astronaut: {
        grade: ({ grade_id }, args, { db }, infos) => db.grade.query().findById(grade_id),
        planet: ({ planet_id }, args, { db }, infos) => planet_id ? db.planet.query().findById(planet_id) : null,
    },
    Mutation: {
        createAstronaut: async (root, { input }, { db }, infos) => db.astronaut.query().insert({ ...input }).returning('*'),
        astronaut: AstronautOps
    }
}

module.exports = resolvers;