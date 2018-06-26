'use strict';

const pubsub = require('../helpers/pubsub');
const PaginationHelper = require('../helpers/pagination');

const ASTRONAUT_ADD_POINTS = 'ASTRONAUT_ADD_POINTS';
const ASTRONAUT_RANK_UP = 'ASTRONAUT_RANK_UP';

const AstronautOps = (root, { id }, { db }, infos) => ({
    addPoints: async ({ points }) => {
        const astronaut = await db.astronaut
            .query()
            .findById(id)
            .then(astronaut => db.astronaut
                .query()
                .patch({ points: astronaut.points + points })
                .where({ id })
                .returning('*')
                .then(rows => rows.length > 0 ? rows[0] : null)
            );

        pubsub.publish(ASTRONAUT_ADD_POINTS, { astronautAddPoints: astronaut });

        return astronaut;
    },
    update: ({ input }) => db.astronaut
        .query()
        .patch({ ...input })
        .where({ id })
        .returning('*')
        .then(rows => rows.length > 0 ? rows[0] : null),
    delete: () => db.astronaut.query().deleteById(id)
});

const resolvers = {
    Query: {
        astronautConnection: async (root, { first, last, before, after }, { db }, infos) => {

            let id = null;
            if (typeof before === "string") {
                id = PaginationHelper.convertCursorToNodeId(before);
            } else if (typeof after === "string") {
                id = PaginationHelper.convertCursorToNodeId(after);
            }

            let where = [];
            if (typeof id === "number") {
                const { id: matchingIndex } = await db.astronaut.query().findById(id);
                if (matchingIndex != -1) where = ['id', before ? '<' : '>', matchingIndex];
            }

            const [totalCount, astronauts] = await Promise.all([
                db.astronaut.query().resultSize(),
                db.astronaut.query().where(builder => {
                    where.length > 0 && builder.where(...where);
                }).orderBy('id', 'ASC').limit(first || last || 10),
            ]);

            const edges = astronauts.map(node => ({
                node,
                cursor: PaginationHelper.convertNodeToCursor(node)
            }));

            const startCursor = edges.length > 0 ? PaginationHelper.convertNodeToCursor(edges[0].node) : null;
            const endCursor = edges.length > 0 ? PaginationHelper.convertNodeToCursor(edges[edges.length - 1].node) : null;
            const hasNextPage = astronauts.length < (last || first) ? false : db.astronaut
                .query()
                .where('id', before ? '>' : '<', astronauts[astronauts.length - 1].id)
                .orderBy('id', 'ASC')
                .first();
            const hasPreviousPage = false;

            return {
                totalCount: totalCount,
                edges,
                pageInfo: {
                    startCursor,
                    endCursor,
                    hasNextPage,
                    hasPreviousPage
                }
            };
        },
        astronaut: (root, { id }, { db }, infos) => db.astronaut.query().findById(id),
    },
    Mutation: {
        createAstronaut: (root, { input }, { db }, infos) => db.astronaut
            .query()
            .insert({ ...input })
            .returning('*'),
        astronaut: AstronautOps
    },
    Subscription: {
        astronautAddPoints: {
            subscribe: () => pubsub.asyncIterator([ASTRONAUT_ADD_POINTS])
        },
        astronautRankUp: {
            subscribe: () => pubsub.asyncIterator([ASTRONAUT_RANK_UP])
        },
    },
    Astronaut: {
        planet: ({ planet_id }, args, { dataloaders }, infos) => planet_id ? dataloaders.planetById.load(planet_id) : null,
    }
}

module.exports = resolvers;