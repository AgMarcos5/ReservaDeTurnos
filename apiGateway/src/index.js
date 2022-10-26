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


const reservas = [
    {
        "id": "1", // id numérico único que representa el tuno
        "datetime": "2022-09-02T19:58:10.406Z", // formato ISO String
        "userId": "2", // id de usuario si está registrado, o 0 si no lo está
        "email": "email@gmail.com", // email del usuario
        "branchId": "3" // id de la sucursal
    },
    {
        "id": "2", 
        "datetime": "2022-09-02T19:58:10.406Z", 
        "userId": "3", 
        "email": "email@gmail.com", 
        "branchId": "3" 
    }
]
    

const server = http.createServer((req,res) => {

    const { url, method} = req;

    // Logger
    console.log(`URL: ${url} - Method: ${method}`)

    switch(method) {
        case "GET":
            if(url === "/reservas") {
                // pedir al modulo de reservas
                pedir(5000);
                
                /*
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.write(JSON.stringify(reservas))
                res.end();
                */
            }
            if(url === "/sucursales") {
                // sucursales
                // pedir por http al modulo de sucursales
                // retornar las sucursales
                pedir(4000);
            }
            break;
        case "POST":
            if(url === "/reservas"){
                // agregar turno
                // 
            }
            break;
        case "PUT":
            //agregar turno
            
            break;
        case "DELETE":
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.write("404 NOT FOUND")
            res.end();
    }

})

server.listen(3000);
console.log("Server en el puerto 3000");


/*
function pedirSucursales(){
    let body = '';
    const request = http.request('http://localhost:4000/', {method: 'GET'}, function(response){
        

        response
            .on('data', chunk => {
                body += chunk;
            })
            .on('end', () => {
                request.body = JSON.parse(body);
                //console.log(body);
            })
    });
    //console.log(request.body);
    //request.write("hola");
    request.end();
}

*/

function pedir(puer){
    let body = '';
    const request = http.request(`http://localhost:${puer}/`, {method: 'GET'}, function(response){
        

        response
            .on('data', chunk => {
                body += chunk;
            })
            .on('end', () => {
                request.body = JSON.parse(body);
                console.log(request.body);
            })
    });
    request.end();
}