'use strict';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server');
const importSchema = require('./helpers/graphql-import');

const logger = require('./helpers/logger');
const Db = require('./helpers/db');
const Dataloaders = require('./dataloaders');
const resolvers = require('./resolvers');
const schemaDirectives = require('./directives');

const { auth } = require('./helpers/auth');

const PORT = 4000;
const app = express();

app.use(morgan('dev', { stream: logger.stream }));

const server = new ApolloServer({
    typeDefs: importSchema(`${__dirname}/definitions/schema.graphql`),
    resolvers,
    schemaDirectives,
    debug: false,
    context: async ({ req, connection }) => ({
        db: Db(),
        dataloaders: Dataloaders(),
        authorization: req ?
            req.get('Authorization') :
            (connection ? connection.context.headers.Authorization : null)
    }),
    subscriptions: {
        onConnect: (connectionParams, websocket, context) => {
            console.log('onConnect');
            return {
                headers: connectionParams
            };
        },
        onDisconnect: (websocket, context) => {
            console.log('onDisconnect');
        }
    },
    tracing: true,
    formatParams: params => {
        const { queryString, operationName } = params;

        let Type = 'Query';
        if (queryString.search('mutation') !== -1) Type = 'Mutation';
        if (queryString.search('subscription') !== -1) Type = 'Subscription';

        logger.info(`${Type} executed: ${operationName}`);
        return params;
    },
    formatError: error => {
        logger.error(error);
        return error;
    },
    formatResponse: (response) => {
        // console.log(response.extensions);
        return response;
    },
});

server.applyMiddleware({ app })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));