const express = require('express');
const userRoute = express.Router();
const { loginUser, validateOtpAndRegisterUser, sendOtpOnUserRegistration, verifyJWT } = require('../../controllers/controllers');


userRoute.post('/registration', sendOtpOnUserRegistration);
userRoute.post('/validateOTP', validateOtpAndRegisterUser);
userRoute.post('/login', loginUser);
userRoute.post('/verifyUser', verifyJWT);



module.exports = userRoute;