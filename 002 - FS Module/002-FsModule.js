const fs = require('fs');
const path = require('path');
const { para } = require('./module.js');


// console.log(fs);
// console.log(path);
// console.log(__dirname);
// console.log(__filename);

const fileName = path.join(__dirname, '/Public', 'index.txt');

fs.mkdirSync('Public'); // create directory of Public name
fs.writeFileSync(fileName, para); // create a file and write 'para' in it

fs.writeFileSync(fileName, 'hi'); // will overwrite the existing data in the /Public/index.txt

fs.readFileSync(fileName,'utf-8',(error,content)=>{
    console.log(content);
});

fs.appendFileSync(fileName,"How are your"); // append existing data in the /Public/index.txt (won't overwrite)

fs.unlinkSync(fileName); // Delete /Public/index.txt

