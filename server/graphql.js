'use strict';

const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const server = new ApolloServer({
    typeDefs: importSchema(`${__dirname}/definitions/schema.graphql`),
    mocks: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});