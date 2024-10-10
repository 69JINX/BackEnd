const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUTER}.${process.env.DB_CODE}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUTER}`;




const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    thumbnail: String,
    images: Array,
    status: {
        type: Boolean,
        default: true
    },
    // email: {
    //     type: String,
    //     unique: true
    // }
})

const ProductModel = mongoose.model('products', productSchema);

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
        }
    })
}).fields([
    {
        name: 'thumbnail',
        maxCount: 1
    },
    {
        name: 'images',
        maxCount: 10
    }
]);

app.post('/upload', upload, async (req, res) => {
    try {
        const data = req.body;

        if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        if (req.files.images) data.images = req.files.images.map((file) => file.filename);

        const dataToSave = new ProductModel(data);
        const response = await dataToSave.save();

        res.status(200).json({ message: 'Uploaded Succesfully', data: response });
    }
    catch (error) {
        console.log(error);
    }
})

app.get('/read', async (req, res) => {
    const response = await ProductModel.find();
    res.json(response);
})

app.delete('/delete/:_id', async (req, res) => {
    try {

        const readForDel = await ProductModel.find(
            req.params
        );

        readForDel.forEach((product) => {
            if (product.thumbnail) {
                if (fs.existsSync(path.join(__dirname, 'uploads', product.thumbnail))) {
                    fs.unlinkSync(path.join(__dirname, 'uploads', product.thumbnail));
                }
            }
        });

        readForDel.forEach((product) => {
            if (product.images) {
                product.images.forEach((image) => {
                    if (fs.existsSync(path.join(__dirname, 'uploads', image))) {
                        fs.unlinkSync(path.join(__dirname, 'uploads', image));
                    }
                });
            }
        });

        const response = await ProductModel.deleteOne(
            req.params
        );
        res.json(response);

    }
    catch (error) {
        console.log(error)
    }

})

app.listen(process.env.PORT, (req, res) => {
    try {
        mongoose.connect(url)
            .then(() => {
                console.log('Database Connected');
            })
    }
    catch (error) {
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.PORT}`)
});

app.put('/update', async (req, res) => {

})