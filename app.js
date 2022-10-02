const http = require('http')
const moment = require('moment')

let timing = moment();
const date = timing.format("dddd, Do MMM YYYY")
console.log(date) 
http.createServer(function(request, response){
    
    let timing = moment();
    const date = timing.format("dddd, Do MMM YYYY")
    console.log(date) 

    response.write(date);
    response.end();
}).listen(3000);