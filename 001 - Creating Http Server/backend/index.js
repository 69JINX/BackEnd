const express = require('express');
const app = express();

app.listen(5000,()=>{
console.log('server is running at port 5000');
});

app.get('/greet/:name',(req,res)=>{
console.log(req.params);
console.log(req.body);
res.status(200).json({message:'Success'});
});
