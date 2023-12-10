const { Router } = require('express');

const router = Router();

const orderController = require('../controllers/order.controller');

router.post('/', orderController.create);

module.exports = router;