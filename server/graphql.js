'use strict';

const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const resolvers = {
    Query: {
        hello: (root, { name = 'world' }) => `Hello ${name} !`
    }
};

const server = new ApolloServer({
    typeDefs: importSchema(`${__dirname}/definitions/schema.graphql`),
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});