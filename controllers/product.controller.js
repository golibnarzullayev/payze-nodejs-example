const productService = require('../services/product.service');

const { StatusCode } = require("../enums/status-code.enum");
const { SuccessCode } = require("../enums/success-code.enum");

class ProductController {
    constructor() {}

    async create (req, res, next) {
        try {
            const data = req.body;

            const result = await productService.create(data);

            res.status(StatusCode.Created).json({ message: SuccessCode.ProductCreated, data: result });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController();