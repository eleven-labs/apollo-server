'use strict';

const { Model } = require('objection');

const Rank = {

};

class Astronaut extends Model {
    static get tableName() {
        return 'astronaut';
    }

    async $beforeUpdate(opt, ctx) {
        super.$beforeUpdate(opt, ctx);
        if (this.points >= 50 && this.points <= 100) {
            this.rank = '';
        } else if (this.points >= 100 && this.points <= 200) {

        } else if (this.points >= 100 && this.points <= 200) {

        } else if (this.points >= 200 && this.points <= 300) {

        } else if (this.points >= 300 && this.points <= 500) {

        } else if (this.points >= 500 && this.points <= 750) {

        } else if (this.points >= 750 && this.points <= 1000) {

        } else if (this.points >= 750 && this.points <= 1000) {

        } else if (this.points >= 1500 && this.points <= 2000) {

        } else if (this.points >= 2000 && this.points <= 3000) {

        } else if (this.points >= 3000 && this.points <= 5000) {

        }
    }
}

module.exports = Astronaut;