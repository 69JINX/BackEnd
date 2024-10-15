const express = require('express');
const { addColor, readColor, updateStatusColor, deleteColor, deleteColors } = require('../../controllers/controllers');

const colorRoutes = express.Router();

colorRoutes.post('/add-color', addColor);
colorRoutes.get('/read-color', readColor);
colorRoutes.put('/update-status/:_id', updateStatusColor);
colorRoutes.put('/delete-color/:_id', deleteColor);
colorRoutes.put('/delete-colors', deleteColors);

module.exports = colorRoutes;