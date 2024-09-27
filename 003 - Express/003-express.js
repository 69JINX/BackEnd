const express = require('express');
const router = express();


router.listen(3000, () => {
    console.log('server is running on port 3000');
});
router.get('/', (req, res) => {
    res.send('Hello Everyone!');
});

