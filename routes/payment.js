const express = require('express');

const router = express.Router(); 

const payments = require('../controllers/payment');


router.post('/order', payments.orders );
router.post('/verify', payments.verify);

module.exports = router;