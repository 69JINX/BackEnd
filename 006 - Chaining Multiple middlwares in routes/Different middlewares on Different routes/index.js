const express = require('express');
const app = express();

const router1 = express();
const router2 = express();

const m1 =(req,res,next)=>{
console.log('middleware 1');
next();
}
const m2 =(req,res,next)=>{
console.log('middleware 2');
next();
}

router1.use(m1);
router2.use(m2);

app.use('/cat1',router1);
app.use('/cat2',router2);

router1.get('/r1',(req,res)=>{
console.log('route 1');
});
router1.get('/r2',(req,res)=>{
console.log('route 2');
});
router2.get('/r3',(req,res)=>{
console.log('route 3');
});
router2.get('/r4',(req,res)=>{
console.log('route 4');
});

app.listen(3000,(req,res)=>{
console.log('server is running on port 300');
});