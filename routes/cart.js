const express = require('express');

const router = express.Router(); 

const carts = require('../controllers/carts');

const {ensureAuth} = require('../middleware/auth');


router.get('/',carts.getCartItems);
router.post('/add',carts.addToCart);
router.post('/remove', carts.removeItemFromCart);
router.get('/amount', carts.getCartAmount);
// router.delete('/add', carts.emptyCart);

module.exports = router;