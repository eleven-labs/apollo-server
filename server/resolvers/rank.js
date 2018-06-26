'use strict';

const resolvers = {
    Query: {
        ranks: () => [
            'ROOKIE',
            'ENSIGN',
            'LIEUTENANT',
            'LIEUTENANT_COMMANDER',
            'COMMANDER',
            'CAPTAIN',
            'FLEET_CAPTAIN',
            'COMMODORE',
            'REAR_ADMIRAL',
            'VICE_ADMIRAL',
            'ADMIRAL',
            'FLEET_ADMIRAL'
        ]
    }
}

module.exports = resolvers;