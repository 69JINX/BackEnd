const express = require('express');
const userRoute = express.Router();
const { registerUser, loginUser } = require('../../controllers/controllers');


userRoute.post('/registration', registerUser);
userRoute.post('/login', loginUser);

module.exports = userRoute;