//(002) 26-Sept-2024 WsCube Tech LMS Portal : 36:45

const express = require('express');
const app = express();

//localhost:3000/page1?name=Avinash&age=20
app.post('/page1', (req, res) => {
    console.log(req.query);
    res.send('Page 1 data received');
})

//localhost:3000/page2/Avinash
app.post('/page2/:name', (req, res) => {
    console.log(req.params);
    res.send(`Hello ${req.params.name}. Page 2 data received`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})