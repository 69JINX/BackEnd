const express = require('express');
const app = express();

const m = (req, res, cb) => {
    console.log('Middleware m called');
    cb();
}

app.use(m); // applying middleware m on all the routes of app

app.get('/r1', (req, res) => {
    res.send('Route 1')
});
app.get('/r2', (req, res) => {
    res.send('Route 2')
});
app.get('/r3', (req, res) => {
    res.send('Route 3')
});
app.get('/r4', (req, res) => {
    res.send('Route 4')
});
app.get('/r5', (req, res) => {
    res.send('Route 5')
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});