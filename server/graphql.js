'use strict';

const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const Db = require('./helpers/db');
const Dataloaders = require('./dataloaders');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs: importSchema(`${__dirname}/definitions/schema.graphql`),
    resolvers,
    context: {
        db: Db(),
        dataloaders: Dataloaders()
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});