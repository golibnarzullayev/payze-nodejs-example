const productModel = require('../models/product.model');

class ProductRepo {
    constructor(productModel) {
        this.productModel = productModel;
    }

    async create(data) {
        return this.productModel.create(data);
    }

    async getById(id) {
        return this.productModel.findById(id);
    }
}

module.exports = new ProductRepo(productModel);