const express = require('express');

const router = express.Router(); 

const orders = require('../controllers/orders');

const { ensureAdmin } = require('../middleware/auth')


router.get('/',ensureAdmin,orders.getAllOrders);
router.post('/create', orders.createOrder);

module.exports = router;