'use strict';

const convertNodeToCursor = ({ id }) => bota(id.toString());
const bota = (input) => new Buffer(input.toString(), 'binary').toString("base64");
const convertCursorToNodeId = (cursor) => parseInt(atob(cursor));
const atob = (input) => new Buffer(input, 'base64').toString('binary');

module.exports = {
    convertNodeToCursor,
    bota,
    convertCursorToNodeId,
    atob,
};