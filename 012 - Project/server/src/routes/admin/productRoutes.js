const express = require('express');
const { createProduct, readProducts, permanentDeleteProduct, updateStatusProduct, deleteProduct, deletedProducts, recoverProduct, deleteProducts } = require('../../controllers/controllers');
const upload = require('../../middlewares/multer');

const productRoutes = express();

productRoutes.post('/create-product', upload('product'), createProduct);
productRoutes.get('/read-products', readProducts);
productRoutes.put('/update-status/:_id', updateStatusProduct);
productRoutes.put('/delete-product/:_id', deleteProduct);
productRoutes.put('/delete-products', deleteProducts);
productRoutes.get('/deleted-products', deletedProducts);
productRoutes.put('/recover-product/:_id', recoverProduct);
productRoutes.delete('/permanent-delete-product/:_id', permanentDeleteProduct);


module.exports = productRoutes