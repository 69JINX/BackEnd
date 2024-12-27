const axios = require('axios');

const data = {
name:'Avinash',
age:24
}

//can't send body when using get method so the object 'data' won't get send
axios.get(`http://localhost:5000/greet/${data}`)
.then((res)=>{
console.log(res);
})
.catch((err)=>{
console.log(err);
})