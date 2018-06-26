'use strict';

const { Model } = require('objection');

class Astronaut extends Model {
    static get tableName() {
        return 'astronaut';
    }

    async $beforeUpdate(opt, ctx) {
        super.$beforeUpdate(opt, ctx);
        if (this.points >= 50 && this.points <= 100) {
            this.rank = 'ROOKIE';
        } else if (this.points >= 100 && this.points <= 200) {
            this.rank = 'ENSIGN';
        } else if (this.points >= 100 && this.points <= 200) {
            this.rank = 'LIEUTENANT';
        } else if (this.points >= 200 && this.points <= 300) {
            this.rank = 'LIEUTENANT_COMMANDER';
        } else if (this.points >= 300 && this.points <= 500) {
            this.rank = 'COMMANDER';
        } else if (this.points >= 500 && this.points <= 750) {
            this.rank = 'CAPTAIN';
        } else if (this.points >= 750 && this.points <= 1000) {
            this.rank = 'FLEET_CAPTAIN';
        } else if (this.points >= 750 && this.points <= 1000) {
            this.rank = 'COMMODORE';
        } else if (this.points >= 1500 && this.points <= 2000) {
            this.rank = 'REAR_ADMIRAL';
        } else if (this.points >= 2000 && this.points <= 3000) {
            this.rank = 'VICE_ADMIRAL';
        } else if (this.points >= 3000 && this.points <= 5000) {
            this.rank = 'FLEET_ADMIRAL';
        }
    }
}

module.exports = Astronaut;