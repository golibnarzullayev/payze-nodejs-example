const transactionModel = require('../models/tranzaction.model');

class TransactionRepo {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }

    async create(data) {
        return this.transactionModel.create(data);
    }

    async getByTransactionId(transactionId) {
        return this.transactionModel.findOne({ transactionId: transactionId });
    }

    async updateByTransactionId(transactionId, data) {
        return this.transactionModel.findOneAndUpdate({ transactionId: transactionId }, data, { new: true });
    }
}

module.exports = new TransactionRepo(transactionModel);