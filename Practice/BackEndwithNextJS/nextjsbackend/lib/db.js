
// const mongoose = require('mongoose');
// const { registerAdmin } = require('../controllers/controllers');
// require('dotenv').config();

import mongoose from 'mongoose'

const url = process.env.MONGODB_URL;

(async () => {
    try {
        await mongoose.connect(url)
            .then(() => {
                console.log('Succefully Connected to Database.')
            })
    }
    catch (error) {
        console.error('Unable to Connect to Database !', error, error.reason);
    }
})();