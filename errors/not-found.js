const BaseError = require('./base-error');

const { StatusCode } = require('../enums/status-code.enum');

class NotFoundError extends BaseError {
    constructor(code, data) {
        super(code, StatusCode.NotFound, data);
    }
}

module.exports = NotFoundError;