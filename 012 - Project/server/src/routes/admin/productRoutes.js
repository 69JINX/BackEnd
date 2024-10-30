const express = require('express');
const { createProduct, readProducts, permanentDeleteProduct } = require('../../controllers/controllers');
const upload = require('../../middlewares/multer');

const productRoutes = express();

productRoutes.post('/create-product', upload('product'), createProduct);
productRoutes.get('/read-products', readProducts);
productRoutes.delete('/permanent-delete-product/:_id', permanentDeleteProduct);

module.exports = productRoutes