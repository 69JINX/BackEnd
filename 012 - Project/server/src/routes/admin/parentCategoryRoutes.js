const express = require('express');
const parentCategoryController = require('../../controllers/admin-panel/parentCategoryController');
const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/create-category', parentCategoryController);

module.exports = parentCategoryRouter;