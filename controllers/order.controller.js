const orderService = require('../services/order.service');

const { StatusCode } = require("../enums/status-code.enum");
const { SuccessCode } = require("../enums/success-code.enum");

class OrderController {
    constructor() {}

    async create(req, res, next){
        try {
            const data = req.body;
            const paymentUrl = await orderService.create(data);

            res.status(StatusCode.Ok).json({ message: SuccessCode.TransactionStatusUpdated, data: { paymentUrl: paymentUrl } })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new OrderController();