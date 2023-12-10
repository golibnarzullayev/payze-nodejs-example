const jsonwebtoken = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized');

exports.generateToken = (payload, secret, expireTime) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, { expiresIn: expireTime }, async (error, token) => {
            if (error) return reject(error);

            resolve(token);
        });
    });
}

exports.verify = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, (error, payload) => {
            if (error) return reject(new UnauthorizedError());

            resolve(payload);
        });
    });
}