const BaseError = require('./base-error');

const { StatusCode } = require('../enums/status-code.enum');
const { ErrorCode } = require('../enums/error-code.enum')

class UnauthorizedError extends BaseError {
    constructor(name, message) {
        super(name || ErrorCode.Unauthorized, StatusCode.Unauthorized, {
            message
        });
    }
}

module.exports = UnauthorizedError;