const transactionRepo = require('../repositories/transaction.repo');
const orderRepo = require('../repositories/order.repo');

const { verify } = require('../middlewares/transaction.middleware');
const environments = require('../config/environments');

const NotFoundError = require('../errors/not-found');
const UnauthorizedError = require('../errors/unauthorized');

const { PayzePaymentStatus } = require('../enums/transaction.enum');
const { OrderStatus } = require('../enums/order.enum');
const { ErrorCode } = require("../enums/error-code.enum");

class TransactionService {
    constructor(transactionRepo, orderRepo, verify) {
        this.transactionRepo = transactionRepo;
        this.orderRepo = orderRepo;
        this.verify = verify;
    }

    async hook(data, token) {
        const {
            PaymentId: transactionId,
            PaymentStatus: status,
            Amount: amount,
            CardMask: cardMask,
            CaptureDate: captureDate,
            BlockDate: blockDate
        } = data;

        const PAYZE_TOKEN_SECRET_KEY = environments.PAYZE_TOKEN_SECRET_KEY;
        const { orderId } = await this.verify(token, PAYZE_TOKEN_SECRET_KEY);

        if (!orderId) throw new UnauthorizedError(ErrorCode.Unauthorized);

        const order = await this.orderRepo.getById(orderId);
        if (!order) throw new NotFoundError(ErrorCode.OrderNotFound);

        switch (status) {
            case PayzePaymentStatus.Draft: {
                const transaction = await this.transactionRepo.getByTransactionId(transactionId);
                if (!transaction) {
                    await this.transactionRepo.create({
                        transactionId: transactionId,
                        orderId: orderId,
                        amount: amount,
                        status: status,
                    })
                }
                break;
            }

            case PayzePaymentStatus.Captured: {
                await this.updateOrder(orderId, { status: OrderStatus.Paid });

                const data = {
                    status: status,
                    cardMask: cardMask,
                    performTime: captureDate,
                }
                await this.updateTransaction(transactionId, data);
                break;
            }

            case PayzePaymentStatus.Blocked: {
                await this.updateOrder(orderId, { status: OrderStatus.Canceled });

                const data = {
                    status: status,
                    cardMask: cardMask,
                    blockedTime: blockDate,
                }
                await this.updateTransaction(transactionId, data);
                break;
            }

            case PayzePaymentStatus.Rejected:
            case PayzePaymentStatus.Refunded:
            case PayzePaymentStatus.PartiallyRefunded: {
                await this.updateOrder(orderId, { status: OrderStatus.Canceled });

                const data = {
                    status: status,
                    cardMask: cardMask,
                    cancelTime: Date.now(),
                }
                await this.updateTransaction(transactionId, data);
                break;
            }
        }
    }

    async updateOrder(id, data) {
        await this.orderRepo.updateById(id, data);
    }

    async updateTransaction(id, data) {
        await this.transactionRepo.updateByTransactionId(id, data);
    }
}

module.exports = new TransactionService(transactionRepo, orderRepo, verify);