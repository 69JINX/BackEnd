const express = require('express');
const { addColor, readColor, updateStatusColor } = require('../../controllers/controllers');

const colorRoutes = express.Router();

colorRoutes.post('/add-color', addColor);
colorRoutes.get('/read-color', readColor);
colorRoutes.put('/update-status/:_id', updateStatusColor);

module.exports = colorRoutes;