const express = require('express');
const userRoute = express.Router();
const { loginUser, validateOtpAndRegisterUser, sendOtpOnUserRegistration } = require('../../controllers/controllers');


userRoute.post('/registration', sendOtpOnUserRegistration);
userRoute.post('/validateOTP', validateOtpAndRegisterUser);
userRoute.post('/login', loginUser);

module.exports = userRoute;