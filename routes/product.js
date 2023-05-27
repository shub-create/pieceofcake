const express = require('express');

const router = express.Router();

const products = require('../controllers/products');
const { ensureAdmin } = require('../middleware/auth')


router.post('/create', ensureAdmin, products.addProduct);
router.get('/', products.getAllProduct);
router.get('/search', products.searchProduct);

router.get('/category',products.getProductByCategory);
router.get('/:productId', products.getProductById);

router.delete('/delete',ensureAdmin,products.deleteProduct);
router.put('/update-price',ensureAdmin,products.updatePrice);
router.post('/update-rating', products.updateRating);


module.exports = router;