const BaseError = require('./base-error');

const { StatusCode } = require('../enums/status-code.enum');

class BadRequestError extends BaseError {
    constructor(name, data, message) {
        super(name, StatusCode.BadRequest, data);

        this.message = message;
    }
}

module.exports = BadRequestError;