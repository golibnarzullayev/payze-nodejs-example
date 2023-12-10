const orderRepo = require('../repositories/order.repo');
const productRepo = require('../repositories/product.repo');
const transactionRepo = require('../repositories/transaction.repo');

const NotFoundError = require('../errors/not-found');

const environments = require('../config/environments');
const { generateToken } = require('../middlewares/transaction.middleware');
const { getPayzeApi } = require("../utils/payze-api.util");

const { ErrorCode } = require("../enums/error-code.enum");
const { PaymentProvider } = require("../enums/order.enum");

class OrderService {
    constructor(orderRepo, productRepo, transactionRepo, generateToken) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.transactionRepo = transactionRepo;
        this.generateToken = generateToken;
    }

    async create(data) {
        const { user, products, paymentProvider } = data;

        let totalPrice = 0;
        for (const { count, productId } of products) {
            const product = await this.productRepo.getById(productId);
            if (!product) throw new NotFoundError(ErrorCode.ProductNotFound);

            const { price } = product;
            totalPrice += count * price;
        }

        const order = await this.orderRepo.create({
            user: user,
            products: products,
            paymentProvider,
            totalPrice: totalPrice,
        });

        let paymentUrl;
        switch (paymentProvider) {
            case PaymentProvider.Payze:
                paymentUrl = await this.createPayzeUrl(order);
                break;
        }

        return paymentUrl;
    }

    async createPayzeUrl(order) {
        const { totalPrice } = order;

        const { PAYZE_API_KEY, PAYZE_API_SECRET, PAYZE_API_METHOD, PAYZE_HOOK_URL, PAYZE_SUCCESS_URL, PAYZE_ERROR_URL, PAYZE_TOKEN_SECRET_KEY, PAYZE_TOKEN_EXPIRE_TIME } = environments;

        const currency = 'UZS';
        const orderId = order._id.toString();

        const token = await this.generateToken({ orderId: orderId }, PAYZE_TOKEN_SECRET_KEY, PAYZE_TOKEN_EXPIRE_TIME);

        const hookUrl = `${PAYZE_HOOK_URL}?authorization_token=${token}`;

        console.log(hookUrl);

        const requestData = {
            method: PAYZE_API_METHOD,
            apiKey: PAYZE_API_KEY,
            apiSecret: PAYZE_API_SECRET,
            data: {
                amount: totalPrice,
                currency: currency,
                callback: PAYZE_SUCCESS_URL,
                callbackError: PAYZE_ERROR_URL,
                preauthorize: false,
                lang: 'RU',
                hookUrlV2: hookUrl,
            }
        }

        const api = getPayzeApi();
        const result = await api.post('/', requestData);

        const { transactionUrl, transactionId } = result.data.response;

        await this.transactionRepo.create({
            transactionId: transactionId,
            orderId: orderId,
            amount: totalPrice,
        })

        return transactionUrl;
    }
}

module.exports = new OrderService(orderRepo, productRepo, transactionRepo, generateToken)