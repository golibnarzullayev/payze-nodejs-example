const productRepo = require('../repositories/product.repo');

class ProductService {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }

    async create(data) {
        return this.productRepo.create(data);
    }
}

module.exports = new ProductService(productRepo)