const express = require('express');
const { createParentCategory, readParentCategory, updateStatusParentCategory } = require('./../../controllers/controllers')
const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-category', readParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateStatusParentCategory)

module.exports = parentCategoryRouter;