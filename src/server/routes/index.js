const express = require('express');

const cartRoutes = require('./cart');

const router = express.Router();

router.use(cartRoutes);

module.exports = router;