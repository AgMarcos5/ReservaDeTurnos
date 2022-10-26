console.log("Gestion sucursales")

const http = require("http");
const fs = require('fs');
//const {bodyParser} = require("./lib/bodyParser");




function cargaSucursales(request,response){
    let sucursalesJson = fs.readFileSync('./servicios/gestionSucursales/sucursales.json');
    //const sucursales = JSON.parse(sucursalesJson);
    //console.log(sucursales);

    let body = '';

    request
        .on('data', chunk => {
            body += chunk;
        })
        .on('end', () => {
            response.end(sucursalesJson);
            //response.end('Mundo');
        })
        .on('close', () => {

        })
}


const server = http.createServer((request, response) => {
    cargaSucursales(request,response);
})

server.listen(4000);
console.log("Server en el puerto 4000");