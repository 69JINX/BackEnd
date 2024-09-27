const http = require('http');
const server = http.createServer((req, res) => {
    console.log('hello')
    res.end('hi');
}).listen(3000,()=>{
    console.log('Server is running on port 3000');
});
