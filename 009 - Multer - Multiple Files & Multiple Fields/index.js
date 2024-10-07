const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(Math.random() * 999999) + path.extname(file.originalname));
    }
});

// Single file in Single field
// const upload = multer({storage}).single('thumbnail');

// Multiple files in Single field
// const upload = multer({ storage }).array('thumbnail', 3);

// Multiple files in Multiple fields
const upload = multer({ storage }).fields(
    [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 5 }
    ]
)

app.post('/upload', upload, (req, res) => {
    try {
        // Single file in Single field
        //console.log(req.file);

        // // Multiple files in Single field || Multiple files in Multiple fields
        // console.log(req.files);

        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.images) data.images = req.files.images.map(file => file.filename);
        }
        console.log(data);
        // res.status(200).json({ message: 'success' });
    }
    catch {
        // res.status(500).json({ message: 'intersal server error' });
    }

})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});