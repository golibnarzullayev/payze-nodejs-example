const { Router } = require('express');

const router = Router();

router.use('/products', require('./product.route'));
router.use('/orders', require('./order.route'));
router.use('/transactions', require('./transaction.route'));

module.exports = router;