const express = require('express');
const userRoute = express.Router();
const { registerUser, loginUser, validateOtp } = require('../../controllers/controllers');


userRoute.post('/registration', registerUser);
userRoute.post('/validateOTP', validateOtp);
userRoute.post('/login', loginUser);

module.exports = userRoute;