const express = require('express');

const router = express.Router();

const banners = require('../controllers/banner');

router.post('/add', banners.addbanner);
router.get('/', banners.getBanner);

module.exports = router;