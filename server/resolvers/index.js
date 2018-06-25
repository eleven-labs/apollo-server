'use strict';

const { merge } = require('lodash');

const AstronautResolver = require('./astronaut');
const PlanetResolver = require('./planet');
const AuthResolver = require('./auth');

const resolvers = merge(
    AstronautResolver,
    PlanetResolver,
    AuthResolver,
);

module.exports = resolvers;