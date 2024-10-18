const express = require('express');
const allRoutes = require('./src/app');
const path = require('path');
const cors = require('cors');
require('./src/db/config')
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', allRoutes);
app.use('/frankandoakservices/admin-panel', express.static(path.join(__dirname,'src', 'uploads', 'product-category')))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})