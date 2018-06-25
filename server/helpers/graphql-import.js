'use strict';

const Finder = require('fs-finder');
const fs = require('fs');
const path = require('path');

const importSchema = () => {
    const files = Finder.from(`${process.cwd()}/definitions`).findFiles('*.graphql');
    let definitions = '';

    files.forEach((file) => {
        definitions += fs.readFileSync(file, { encoding: 'utf8' }) + '\n';
    });

    return definitions;
}

module.exports = importSchema;