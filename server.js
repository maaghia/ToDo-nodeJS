const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const {parse} =  require('querystring')
//database
const mysql = require('mysql');
const { createConnection } = require('net');
//date
const moment = require('moment');

//add today's date 
let timing = moment();
const date = timing.format("dddd, Do MMM YYYY")
 
const addPath = __dirname + '/views' + '/add.ejs'
http.createServer(function (request, response) {

    //read the home.ejs file (__dirname+> is the path of the root dir)
    const filePath = __dirname + '/views' + '/home.ejs'
    
    const file = fs.readFileSync(filePath, 'utf8')
   
    
    //current to do list 
    const todos = ['prepare the ES lab', 'finish solving the PL recitation', 'review CLA lecture']
    
    if (request.url === '/add'){

        let body = '';

        request.on('data',function(chunk){
            //do this whan u receive data
            body += chunk.toString();
        })

        request.on('end', function(){
            todos.push(parse(body).todo)
            //console.log(parse(body).todo);
            response.writeHead(200, {'Content-Type':'text/html'})
            const output = ejs.render(file, {todos, addPath, date});
            response.end(output);
        }) 
    }else{
        response.writeHead(200, {'Content-Type':'text/html'})
        const output = ejs.render(file, {todos, addPath, date});
        response.end(output);
    }
    
}).listen(3000);

//database part
/* 
//create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '0000',
    database : 'tasks'
});

//connect
db.connect(function(err){
    if(err){
        console.log('inside err')
        throw err;
    }
    console.log('sql connected');

    //create db
    db.query("CREATE DATABASE tasks", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
}); */





