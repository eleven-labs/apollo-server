'use strict';

const pubsub = require('../helpers/pubsub');

const ASTRONAUT_ADDED = 'ASTRONAUT_ADDED';

const convertNodeToCursor = ({ id }) => bota(id.toString());
const bota = (input) => new Buffer(input.toString(), 'binary').toString("base64");
const convertCursorToNodeId = (cursor) => parseInt(atob(cursor));
const atob = (input) => new Buffer(input, 'base64').toString('binary');

const AstronautOps = (root, { id }, { db }, infos) => ({
    update: async ({ input }) => db.astronaut.query().patch({ ...input }).where({ id }).returning('*').then(rows => rows[0]),
    delete: () => db.astronaut.query().deleteById(id)
});

const resolvers = {
    Query: {
        astronauts: (root, { skip = 0, first }, { db }, infos) => {
            if (!first) return db.astronaut.query();
            return db.astronaut.query().page(skip, first).then(({ results }) => results);
        },
        astronautConnection: async (root, { first = 10, after }, { db }, infos) => {
            let afterIndex = 0;

            // Get ID from after argument or default to first item.
            if (typeof after === "string") {
                let id = convertCursorToNodeId(after);
                if (typeof id === "number") {
                    const { id: matchingIndex } = await db.astronaut.query().findById(id);
                    if (matchingIndex != -1) {
                        afterIndex = matchingIndex;
                    }
                }
            }

            const [
                totalCount,
                astronauts
            ] = await Promise.all([
                db.astronaut.query().resultSize(),
                db.astronaut.query().offset(afterIndex).limit(first),
            ]);

            const edges = astronauts
                .map(node => ({
                    node,
                    cursor: convertNodeToCursor(node)
                }));

            const startCursor = edges.length > 0 ? convertNodeToCursor(edges[0].node) : null;
            const endCursor = edges.length > 0 ? convertNodeToCursor(edges[edges.length - 1].node) : null;
            const hasNextPage = totalCount > afterIndex + first;
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
        createAstronaut: async (root, { input }, { db }, infos) => {
            const astronaut = await db.astronaut.query().insert({ ...input }).returning('*')
            pubsub.publish(ASTRONAUT_ADDED, { astronautAdded: astronaut });
            return astronaut;
        },
        astronaut: AstronautOps
    },
    Subscription: {
        astronautAdded: {
            resolve: (payload, args, ctx) => {
                //throw new Error('Not authenticated');
                return { ...payload.astronautAdded };
            },
            subscribe: () => pubsub.asyncIterator([ASTRONAUT_ADDED]),
        }
    },
    Astronaut: {
        planet: ({ planet_id }, args, { dataloaders }, infos) => planet_id ? dataloaders.planetById.load(planet_id) : null,
    }
}

module.exports = resolvers;