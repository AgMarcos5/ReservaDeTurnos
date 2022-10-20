const http = require("http")
const {bodyParser} = require("./lib/bodyParser")

let database = [];

function getTaskHandler(req,res) {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify(database))
    res.end();
}

async function createTaskHandler(req,res) {  
    try {
        await  bodyParser(req);  
        database.push(req.body)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(database))
        res.end();
    } catch (error) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('Invalid data')
        res.end();
    }
}

async function updateTaskHanlder(req,res) {
    try {
        let {url} = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];
    
        if(idKey === "id") {
            await bodyParser(req);
    
            database[idValue - 1] = req.body;
    
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(database))
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.write('Invalid Request Query')
            res.end();
        }
    } catch (error) {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Invalid Body Data was provided', error.message)
        res.end();
    }

}

async function deleteTaskHandler(req,res) {
    let {url} = req;

    let idQuery = url.split("?")[1];
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if(idKey === "id") {
        database.splice(idValue -1, 1)
        
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write("DELETE successfully")
        res.end();
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Invalid Query')
        res.end();
    }
}

const server = http.createServer((req,res) => {

    const { url, method} = req;

    // Logger
    console.log(`URL: ${url} - Method: ${method}`)

    switch(method) {
        case "GET":
            if(url === "/") {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.write(JSON.stringify({message: "hola mundo"}))
                res.end();
            }
            if(url === "/task") {
                getTaskHandler(req,res);
            }
            break;
        case "POST":
            if(url === "/task"){
                createTaskHandler(req,res);
            }
            break;
        case "PUT":
            updateTaskHanlder(req,res);
            break;
        case "DELETE":
            deleteTaskHandler(req,res);
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.write("404 NOT FOUND")
            res.end();
    }

})

server.listen(3000);
console.log("Server en el puerto 3000")