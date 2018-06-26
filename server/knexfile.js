'use strict';

const environment = process.env.NODE_ENV || 'dev';

const config = {
    dev: {
        client: 'pg',
        connection: 'postgres://elevenlabs:elevenlabs@db:5432/elevenlabs',
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
    },
};

module.exports = config;