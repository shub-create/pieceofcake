const express = require('express');

const router = express.Router(); 

const users = require('../controllers/users');


router.get('/',users.getAllUsers);
router.post('/update', users.updateUserInfo);
router.get('/orders',users.getUserOrders);
router.post('/update-user-order',users.updateUserOrder);


module.exports = router;