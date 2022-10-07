const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const {parse} =  require('querystring')
//database
//import { initializeApp } from 'firebase/app';

/* const mysql = require('mysql');
const { createConnection } = require('net'); */
const {Sequelize, DataTypes, TimeoutError} = require('sequelize')

const sequelize =  new Sequelize({
    dialect: "sqlite",
    storage: "bd.sqlite",
});
//testing...
sequelize.authenticate().then((data)=>{
    console.log("Connection has been established successfully");
})
.catch((err)=>{
    console.log("Unable to connect to the data base")
})
const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //or DataTypes.UUIDV1,
        primaryKey: TimeoutError,
    },
    title: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN
})
console.log(Todo === sequelize.models.Todo) //true


//create a new todo item
const main = async () => {
    await sequelize.sync({ force: true });
      
    const newTodo = Todo.build({title: "test todo", completed: false})
    await newTodo.save();

    
    console.log("--------------------------")
    console.log(todos)
}
main();

//date
const moment = require('moment');
const { Script } = require('vm');

//add today's date 
let timing = moment();
const date = timing.format("dddd, Do MMM YYYY")
 
const addPath = __dirname + '/views' + '/add.ejs'


//current to do list 
const todos = []

http.createServer(function (request, response) {

    //read the home.ejs file (__dirname+> is the path of the root dir)
    const filePath = __dirname + '/views' + '/home.ejs'
    
    const file = fs.readFileSync(filePath, 'utf8')
   
        
    //css
   /*  var requiredPath = url.parse(http.request.url).pathname
    console.log(requiredPath);
 */
    
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





