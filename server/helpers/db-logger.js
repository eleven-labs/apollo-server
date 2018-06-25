'use strict';

/**
 * Return SQL string with inserted bindings
 *
 * @param {String} sql - sql string without bindings
 * @param {Array} bindings
 * @return {String}
 */

const insertBindingsToSQL = (sql, bindings) => {
    return sql.split('?').reduce((memo, part, index) => {
        const binding = bindings[index] ? JSON.stringify(bindings[index]) : ''
        return memo + part + binding
    }, '')
}

/**
 * Return duration in ms based `startTime`
 *
 * @example
 * const startTime = executionTime()
 * const duration = executionTime(startTime)
 *
 * @param {Object} [startTime]
 * @return {Number} duration in ms
 */

const executionTime = (startTime) => {
    if (startTime) {
        const diff = process.hrtime(startTime)
        const duration = diff[0] * 1e3 + diff[1] * 1e-6
        return duration
    } else {
        return process.hrtime()
    }
}

/**
 * Decorate `knex` instance with logger
 *
 * @param {Object} knex - knex instance
 * @param {Object} options
 * @param {Function} [options.logger=console.log]
 * @return {Object} knex - knex instance
 */
const dbLogger = (knex, { logger = console.log } = {}) => {
    const queries = {}
    knex.on('query', ({ sql, bindings, __knexQueryUid: queryId }) => {
        const startTime = executionTime()
        queries[queryId] = { sql, bindings, startTime }
    })
        .on('query-error', (_error, { __knexQueryUid: queryId }) => {
            delete queries[queryId]
        })
        .on('query-response', (response, { __knexQueryUid: queryId }) => {
            const { sql, bindings, startTime } = queries[queryId]
            delete queries[queryId]

            const duration = executionTime(startTime)
            const sqlRequest = insertBindingsToSQL(sql, bindings)

            logger('%s %s', `SQL (${duration.toFixed(3)} ms)`, sqlRequest)
        })
    return knex
}

module.exports = dbLogger;