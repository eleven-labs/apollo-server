'use strict';

const environment = process.env.NODE_ENV || 'dev';

const config = {
    dev: {
        client: 'pg',
        connection: 'postgres://elevenlabs:elevenlabs@localhost:5432/elevenlabs',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
    },
    demo: {
        client: 'pg',
        connection: 'postgres://npmqottkbxephg:1f97712dc723cce53be0551139a083f4b4eff340c059253e9ccb7abd73fa9923@ec2-54-247-87-201.eu-west-1.compute.amazonaws.com:5432/d4c4toq018bqvt',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
};

module.exports = config;