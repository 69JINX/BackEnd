const express = require('express');
const { createProductCategory, readProductCategory } = require('../../controllers/controllers');
const upload = require('../../middlewares/multer');
const productCategoryRoutes = express();

productCategoryRoutes.post('/create-category', upload('product-category'), createProductCategory);
productCategoryRoutes.get('/read-category', readProductCategory);

module.exports = productCategoryRoutes;