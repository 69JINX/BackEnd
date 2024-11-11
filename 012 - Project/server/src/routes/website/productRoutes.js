const express = require('express');
const { activeProductsForWebsite } = require('../../controllers/controllers');

const websiteProductRoute = express.Router();

websiteProductRoute.get('/products', activeProductsForWebsite);

module.exports = websiteProductRoute;