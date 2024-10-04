const express = require('express');
const app = express();
const path = require('path');
const filePath = path.join(__dirname, 'Public/Pages');

app.use(express.static(path.join(__dirname, 'Public')));

app.listen(5000,()=>{
    console.log('server is running at port 5000');
});

app.get('/',(req,res)=>{
    res.sendFile(`${filePath}/Home.html`);
});

app.get('/about',(req,res)=>{
    res.sendFile(`${filePath}/About.html`);
});

app.get('/contact',(req,res)=>{
    res.sendFile(`${filePath}/Contact.html`);
});


app.get('*',(req,res)=>{
res.sendFile(`${filePath}/404.html`)
});