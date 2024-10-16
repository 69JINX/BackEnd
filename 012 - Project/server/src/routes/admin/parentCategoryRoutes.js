const express = require('express');
const { createParentCategory, readParentCategory, updateStatusParentCategory, deleteParentCategory, deleteParentCategories, parentCategoryByID, updateParentCategory } = require('./../../controllers/controllers')
const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-category', readParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateStatusParentCategory)
parentCategoryRouter.put('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteParentCategories);
parentCategoryRouter.get('/read-category/:_id', parentCategoryByID);
parentCategoryRouter.put('/update-category/:_id', updateParentCategory)

module.exports = parentCategoryRouter;