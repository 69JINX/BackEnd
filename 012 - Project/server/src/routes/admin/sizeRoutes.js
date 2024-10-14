const express = require('express');
const { createSize, readSize, updateStatusSize } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.post('/create-size', createSize);
sizeRouter.get('/read-size', readSize);
sizeRouter.put('/update-status/:_id', updateStatusSize)

module.exports = sizeRouter;