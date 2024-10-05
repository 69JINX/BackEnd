const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

//https://www.youtube.com/watch?v=WqJ0P8JnftI


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage }).single('avatar');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload, (req, res) => {
    console.log(req.body);
    console.log(req.file);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});