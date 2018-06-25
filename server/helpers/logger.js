'use strict';

const winston = require("winston");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ level: 'error', filename: `${process.cwd()}/logs/error.log` }),
        new winston.transports.File({ filename: `${process.cwd()}/logs/graphql.log` })
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: (message, encoding) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;