'use strict';

const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../helpers/auth');

const resolvers = {
    Mutation: {
        signup: async (root, args, { db }, infos) => {
            const user = await db.user.insertAndFetch(args);
            const token = jwt.sign({ userId: user.id }, APP_SECRET)

            return {
                token,
                user,
            };
        },
        login: async (root, { email, password }, { db }, infos) => {

            const user = await db.user.query().findOne({ email: email });
            if (!user) throw new Error('No such user found');

            const passwordValid = await user.verifyPassword(password);
            if (!passwordValid) throw new Error('Invalid password');

            const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '1h' });

            return {
                token,
                user,
            }
        },
    },
}

module.exports = resolvers;