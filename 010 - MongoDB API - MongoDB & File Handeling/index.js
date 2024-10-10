const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { config } = require('dotenv');


const app = express();
app.use('/files', express.static(path.join(__dirname, 'uploads')));  // http://localhost:3000/files/1728384105563.jpg (file name from uploads folder)

const client = new MongoClient(process.env.DBURL);

const connection = async () => {
    try {
        await client.connect();
        const db = client.db(process.env.DBNAME);
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + Math.floor(Math.random() * 9999) + path.extname(file.originalname));
        }
    })
}).fields([
    {
        name: 'thumbnail',
        maxCount: 1,
    },
    {
        name: 'images',
        maxCount: 10,
    }]);

app.post('/upload', upload, async (req, res) => {
    const db = await connection();
    const collection = db.collection('products');

    const data = req.body;
    if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
    if (req.files.images) data.images = req.files.images.map(file => file.filename);
    res.json(data);
    console.log(data);
    await collection.insertOne(data);
    console.log(req.body);
    console.log(req.files);
});

app.get('/read', async (req, res) => {
    const db = await connection();
    const collection = db.collection('products');
    const response = await collection.find().toArray();
    res.json(response);
    console.log(response);
});

app.delete('/delete/:_id', async (req, res) => {
    try {
        const db = await connection();
        const collection = db.collection('products');

        const readForDel = await collection.find(
            { _id: new ObjectId(req.params._id) }
        ).toArray();
        console.log(readForDel);

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

        const response = await collection.deleteOne(
            { _id: new ObjectId(req.params._id) }
        );

        res.json(response);
        console.log(response);
    }
    catch (error) {
        console.log(error)
    }

});

app.get('/', (req, res) => {
    res.send('Welcome to our website!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
});