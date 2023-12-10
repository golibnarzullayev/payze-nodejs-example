const { Schema, model } = require('mongoose');
const { OrderStatus, PaymentProvider} = require('../enums/order.enum');

const orderSchema = new Schema({
    user: {
      _id: false,
      type: {
          fullName: {
              type: String,
              required: true,
          },
          phone: {
              type: String,
              required: true,
          }
      },
      required: true
    },
    products: {
        _id: false,
        type: [
            {
                productId: {
                    type: String,
                    required: true
                },
                count: {
                    type: Number,
                    required: true,
                }
            }
        ],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentProvider: {
        type: String,
        enum: Object.values(PaymentProvider),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Pending,
    }
}, {
    timestamps: true
});

module.exports = model('order', orderSchema);