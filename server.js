const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const {parse} =  require("querystring")

http.createServer(function (request, response) {
   // response.write('Hello From NodeJS!');

    //read the home.ejs file (__dirname+> is the path of the root dir)
    const filePath = __dirname + '/views' + '/home.ejs'
    const addPath = __dirname + '/views' + '/add.ejs'
    const file = fs.readFileSync(filePath, 'utf8')
    
    //current to do list 
    const todos = ['prepare the ES lab', 'finish solving the PL recitation', 'review CLA lecture']
    
    if (request.url === '/add'){

        let body = '';

        request.on('data',function(chunk){
            //do this whan u receive data
            body += chunk.toString();
        })

    /*    console.log(body)
        console.log(parse(body))  */

        request.on('end', function(){
            todos.push(parse(body).todo)
            response.writeHead(200, {'Content-Type':'text/html'})
            const output = ejs.render(file, {todos});
    
    response.end(output);
        }) 
    }else{
        response.writeHead(200, {'Content-Type':'text/html'})
        const output = ejs.render(file, {todos});
        response.end(output);
    }

    
}).listen(3000);
