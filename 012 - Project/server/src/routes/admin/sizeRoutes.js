const express = require('express');
const { createSize, readSize, updateStatusSize, deleteSize, deleteSizes } = require('../../controllers/controllers');

const sizeRouter = express.Router();

sizeRouter.post('/create-size', createSize);
sizeRouter.get('/read-size', readSize);
sizeRouter.put('/update-status/:_id', updateStatusSize)
sizeRouter.put('/delete-size/:_id', deleteSize);
sizeRouter.put('/delete-sizes', deleteSizes);

module.exports = sizeRouter;