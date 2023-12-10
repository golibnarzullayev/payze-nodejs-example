const { Router } = require('express');

const router = Router();

const productController = require('../controllers/product.controller');

router.post('/', productController.create);

module.exports = router;