const { Router } = require('express');

const router = Router();

const transactionController = require('../controllers/transaction.controller');

router.post('/payze/hook', transactionController.hook);

module.exports = router;