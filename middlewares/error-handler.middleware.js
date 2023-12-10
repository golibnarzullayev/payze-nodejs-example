const { ErrorCode } = require('../enums/error-code.enum');
const { StatusCode } = require('../enums/status-code.enum');

module.exports = (error, req, res, next) => {
    const name = error?.name;
    const message = error?.message;
    let statusCode = error.statusCode;

    if (name === 'ValidationError') {
        statusCode = StatusCode.BadRequest;
    }

    res.status(statusCode || StatusCode.ServerError).json({
        error: {
            name: name || ErrorCode.InternalServerError,
            message: message || ErrorCode.InternalServerError,
        }
    });
    next();
}