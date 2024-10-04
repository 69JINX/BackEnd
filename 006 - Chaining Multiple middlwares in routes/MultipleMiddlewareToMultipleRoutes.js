const express = require('express');
const app = express();

const Router1 = express.Router(); // created separate Router for middleware m1
const Router2 = express.Router(); // created separate Router for middleware m2

const m = (req, res, cb) => {
    console.log('Middleware m called');
    cb();
}

const m1 = (req, res, cb) => {
    console.log('Middleware m1 called');
    cb();
}

const m2 = (req, res, cb) => {
    console.log('Middleware m2 called');
    cb();
}

app.use(m); // applying middleware m on all the routes of app

Router1.use(m1); // applying middleware m1 on all the routes of Router1
Router2.use(m2); // applying middleware m2 on all the routes of Router2

app.use("/cat1-user", Router1); // Attaching Router1 and Router2 to main router app
app.use("/cat2-user", Router2);

Router1.get('/r1', (req, res) => {
    res.send('Route 1')
});
Router1.get('/r2', (req, res) => {
    res.send('Route 2')
});
Router2.get('/r3', (req, res) => {
    res.send('Route 3')
});
Router2.get('/r4', (req, res) => {
    res.send('Route 4')
});
Router2.get('/r5', (req, res) => {
    res.send('Route 5')
});



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});