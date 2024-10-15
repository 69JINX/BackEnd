const express = require('express');
const { createParentCategory, readParentCategory, updateStatusParentCategory, deleteParentCategory, deleteParentCategories } = require('./../../controllers/controllers')
const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-category', readParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateStatusParentCategory)
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteParentCategories);

module.exports = parentCategoryRouter;