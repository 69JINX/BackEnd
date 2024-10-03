/* 
Assignment(30-Sep-24) : 
Create 20 Routes (r1-r20) and create 4 middlewares (m1-m4)
When route r1-r5 is accessed, middleware m1 & m2 should be called
When route r6-r10 is accessed, middleware m2 & m3 should be called
When route r11-r15 is accessed, middleware m3 & m4 should be called
When route r16-r20 is accessed, all middleware m1, m2, m3 & m4 should be called
*/
const express = require('express');
const app = express(); 
/* Only 1 Main server/Router should be running for 1 App/Website by intializing direct express(). 
If you want to create more routers for multiple routes, it is adviced to create child-branches from main branch(app) and append those child-branches to the Main branch in the last. 
We will be creating child-branches with express.Router() and append all those child-branches in main branch (app) in the last */

const Router1 = express.Router();
const Router2 = express.Router();
const Router3 = express.Router();
const Router4 = express.Router();

const clearScreen = (req, res, cb) => {
    console.clear(); // clear the screen
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
const m3 = (req, res, cb) => {
    console.log('Middleware m3 called');
    cb();
}
const m4 = (req, res, cb) => {
    console.log('Middleware m4 called');
    cb();
}

Router1.use(m1);
Router1.use(m2);

Router2.use(m2);
Router2.use(m3);

Router3.use(m3);
Router3.use(m4);

Router4.use(m1);
Router4.use(m2);
Router4.use(m3);
Router4.use(m4);

app.use(clearScreen); // clearing the console screen whenever changing route
app.use("/cat1-user", Router1);
app.use("/cat2-user", Router2);
app.use("/cat3-user", Router3);
app.use("/cat4-user", Router4);


Router1.get('/r1', (req, res) => {
    res.send('Route 1');
});
Router1.get('/r2', (req, res) => {
    res.send('Route 2');
});
Router1.get('/r3', (req, res) => {
    res.send('Route 3');
});
Router1.get('/r4', (req, res) => {
    res.send('Route 4');
});
Router1.get('/r5', (req, res) => {
    res.send('Route 5');
});
Router2.get('/r6', (req, res) => {
    res.send('Route 6');
});
Router2.get('/r7', (req, res) => {
    res.send('Route 7');
});
Router2.get('/r8', (req, res) => {
    res.send('Route 8');
});
Router2.get('/r9', (req, res) => {
    res.send('Route 9');
});
Router2.get('/r10', (req, res) => {
    res.send('Route 10');
});
Router3.get('/r11', (req, res) => {
    res.send('Route 11');
});
Router3.get('/r12', (req, res) => {
    res.send('Route 12');
});
Router3.get('/r13', (req, res) => {
    res.send('Route 13');
});
Router3.get('/r14', (req, res) => {
    res.send('Route 14');
});
Router3.get('/r15', (req, res) => {
    res.send('Route 15');
});
Router4.get('/r16', (req, res) => {
    res.send('Route 16');
});
Router4.get('/r17', (req, res) => {
    res.send('Route 17');
});
Router4.get('/r18', (req, res) => {
    res.send('Route 18');
});
Router4.get('/r19', (req, res) => {
    res.send('Route 19');
});
Router4.get('/r20', (req, res) => {
    res.send('Route 20');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
