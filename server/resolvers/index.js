'use strict';

const { merge } = require('lodash');

const CoreResolver = require('./core');
const RankResolver = require('./rank');
const AstronautResolver = require('./astronaut');
const PlanetResolver = require('./planet');
const AuthResolver = require('./auth');

const resolvers = merge(
    CoreResolver,
    RankResolver,
    AstronautResolver,
    PlanetResolver,
    AuthResolver,
);

module.exports = resolvers;