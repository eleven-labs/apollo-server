'use strict';

const { Model } = require('objection');
const Bcrypt = require('bcrypt');

const ROUNDS = 12;
const REGEXP = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;

class User extends Model {
    static get tableName() {
        return 'user';
    }

    async $beforeInsert(ctx) {
        super.$beforeInsert(ctx);
        await this.generateHash();

    }

    async $beforeUpdate(opt, ctx) {
        super.$beforeUpdate(opt, ctx);
        await this.generateHash();
    }

    /**
     * Compares a password to a Bcrypt hash
     * @param  {String} plainPassword password
     * @return {Promise.<Boolean>} whether or not the password was verified
     */
    verifyPassword(plainPassword) {
        return Bcrypt.compare(plainPassword, this.password);
    }

    /**
     * Generates a Bcrypt hash
     * @return {Promise.<String>}  returns the hash
     */
    async generateHash() {

        const password = this.password;

        if (password) {
            if (this.constructor.isBcryptHash(password)) {
                throw new Error('bcrypt tried to hash another bcrypt hash');
            }

            const hash = await Bcrypt.hash(password, ROUNDS);
            this.password = hash;
            
            return hash;

        }

        throw new Error('password must not be empty');
    }

    /**
     * Detect rehashing for avoiding undesired effects
     * @param {String} str A string to be checked
     * @return {Boolean} True if the str seems to be a bcrypt hash
     */
    static isBcryptHash(str) {
        return REGEXP.test(str);
    }

}

module.exports = User;