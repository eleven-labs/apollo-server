'use strict';

const { Model } = require('objection');

class Seeder {

  constructor(knex) {
    Model.knex(knex);
  }
}

module.exports = Seeder;