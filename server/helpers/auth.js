'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const APP_SECRET = 'ea5d9dbfd952c3cf0f2bd8efec5c2a0741a1bf249e132c3b'; //crypto.randomBytes(24).toString('hex');

const getUser = ({ authorization, db }) => {
    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);

        return db.user.query().findById(userId);
    }

    return null;
};

module.exports = {
    APP_SECRET,
    getUser
};