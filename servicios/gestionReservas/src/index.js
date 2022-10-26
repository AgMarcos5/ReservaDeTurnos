console.log("Gestion Reservas");


const http = require("http");
const fs = require('fs');




function cargaReservas(request,response){
    let reservasJson = fs.readFileSync('./servicios/reservas.json');

    let body = '';

    request
        .on('data', chunk => {
            body += chunk;
        })
        .on('end', () => {
            response.end(reservasJson);
        })
        .on('close', () => {

        })
}


const server = http.createServer((request, response) => {
    cargaReservas(request,response);
})

server.listen(5000);
console.log("Server en el puerto 5000");