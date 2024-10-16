const express = require('express');
const { addColor, readColor, updateStatusColor, deleteColor, deleteColors, colorByID, updateColor } = require('../../controllers/controllers');

const colorRoutes = express.Router();

colorRoutes.post('/add-color', addColor);
colorRoutes.get('/read-color', readColor);
colorRoutes.put('/update-status/:_id', updateStatusColor);
colorRoutes.put('/delete-color/:_id', deleteColor);
colorRoutes.put('/delete-colors', deleteColors);
colorRoutes.get('/read-color/:_id', colorByID);
colorRoutes.put('/update-color/:_id', updateColor);

module.exports = colorRoutes;