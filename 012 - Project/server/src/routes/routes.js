const express = require('express');
const { adminRoutes } = require('./admin/adminRoutes');
const parentCategoryRouter = require('./admin/parentCategoryRoutes');
const colorRoutes = require('./admin/colorRoutes');
const sizeRouter = require('./admin/sizeRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);
adminPanelRoutes.use('/parent-category', parentCategoryRouter);
adminPanelRoutes.use('/color', colorRoutes);
adminPanelRoutes.use('/size', sizeRouter);


module.exports = { adminPanelRoutes, websiteRoutes, appRoutes };