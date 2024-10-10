const express = require('express');
const allRoutes = require('./src/app');
require('./src/db/config')
require('dotenv').config();

const app = express();

app.use('/api', allRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})