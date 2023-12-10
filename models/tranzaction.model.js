const { Schema, model } = require('mongoose');
const { PayzePaymentStatus } = require('../enums/transaction.enum');

const transactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(PayzePaymentStatus),
        default: PayzePaymentStatus.Draft,
    },
    cardMask: {
      type: String,
    },
    performTime: {
        type: Number,
    },
    cancelTime: {
        type: Number,
    },
    blockedTime: {
        type: Number,
    }
}, {
    timestamps: true,
})

module.exports = model('transaction', transactionSchema);