'use strict';

const { merge } = require('lodash');

const GradeResolver = require('./grade');
const AstronautResolver = require('./astronaut');
const PlanetResolver = require('./planet');

const resolvers = merge(
    GradeResolver,
    AstronautResolver,
    PlanetResolver
);

module.exports = resolvers;