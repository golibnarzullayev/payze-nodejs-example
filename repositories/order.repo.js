const orderModel = require('../models/order.model');

class OrderRepo {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async create(data) {
        return this.orderModel.create(data);
    }

    async getById(id) {
        return this.orderModel.findById(id);
    }

    async updateById(id, data) {
        return this.orderModel.findByIdAndUpdate(id, data, { new: true });
    }
}

module.exports = new OrderRepo(orderModel);