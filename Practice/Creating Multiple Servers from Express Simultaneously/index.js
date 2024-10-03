const express = require('express');
const app1 = express();
const app2 = express();

app1.listen(3000,()=>{
console.log('server is listening on port 3000');
});

app2.listen(4000,()=>{
console.log('server is listening on port 4000');
});

app1.get('/',(req,res)=>{
res.send('HELLO FROM APP1');
});

app2.get('/',(req,res)=>{
res.send('HELLO FROM APP2');
});