const http = require("http");    
const { getReservas, getReservasUsuario } = require("./controllers/reservasController");


const error = (req,res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write("404 NOT FOUND")
    res.end();
}


const server = http.createServer((req,res) => {

    const { url, method} = req;

    const idQuery = url.split("/api/")[1];
    const idKey = idQuery?.split("/")[0];    // reserva / sucursales
    const idValue = idQuery?.split("/")[1];  // id

    // Logger
    console.log(`URL: ${url} - Method: ${method}`)

    switch(method) {
        case "GET":
            if(url === "/api/reserva") {
                // Todas las reservas
                getReservas(req,res);
            } 
            else if(url === `/api/reserva/${idValue}`) {
                // Reservas de un usuario
                getReservasUsuario(req,res);
            }
            else if(url === "/api/sucursales") {
                console.log("/api/sucursales")
            }
            else{
                error(req,res)
            }
            break;
        case "POST":
            break;
        case "PUT":            
            break;
        case "DELETE":
            break;
        default:
            error(req,res)
    }

})

server.listen(3000);
console.log("Api Gateway en el puerto 3000");