const express = require('express');
const { createProduct, readProduct } = require('../../controllers/controllers');
const upload = require('../../middlewares/multer');

const productRoutes = express();

productRoutes.post('/create-product', upload('product'), createProduct);
productRoutes.get('/read-product', readProduct);

module.exports = productRoutes