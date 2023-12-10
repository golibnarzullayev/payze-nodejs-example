const transactionService = require('../services/transaction.service');

const { StatusCode } = require("../enums/status-code.enum");
const { SuccessCode } = require("../enums/success-code.enum");

class TransactionController {
    constructor() {}

    async hook(req, res, next){
        console.log(req.body);
        try {
            const data = req.body;
            const token = req.query['authorization_token'];

            await transactionService.hook(data, token);

            res.status(StatusCode.Ok).json({ message: SuccessCode.TransactionStatusUpdated })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TransactionController();