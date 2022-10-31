const http = require("http");    
const { config } = require("./config");

const { getTurnos, getReservaByID, altaReserva, bajaReserva } = require("./controllers/reservas");
const { getSucursales, getSucursal } = require("./controllers/sucursales");
const { responseError } = require("./lib/error");

const PORT = config.PORT ;

const server = http.createServer( async (req,res) => {

    const {url, method} = req;
    
    const idQuery = url.split("/api/")[1];
    const service = idQuery?.split(/[/?]/)[0];    // reserva / sucursales
    const params = idQuery?.split(/[/?]/)[1];  // ID || query params


    console.log(`URL: ${url} - Method: ${method}`)


    switch (method) {
        case "GET":
            if(
                (url === '/api/reserva') || 
                (url === `/api/reserva?${params}`)
            ) {
                // Get Reservas
                getTurnos(req,res, params);
            } 
            else if(url === `/api/reserva/${params}`) {
                // Reservas de un usuario por ID
                getReservaByID(req,res,params);
            }
            else if(url === "/api/sucursales") {
                // Todas las sucursales
                getSucursales(req,res)
            }
            else if(url === `/api/sucursales/${params}`) {
                // Sucursal por ID
                getSucursal(req,res,params)
            }
            else{
                responseError(res, "path incorrecto")
            }
            break;
        case "POST":
            if(url === `/api/reserva/${params}`) {
                // Crear una reserva
                altaReserva(req,res,params);
            } 
            else{
                responseError(res, "path incorrecto")
            }
            break;
        case "PUT":
                // Modificar una reserva
            break;
        case "DELETE":
            if(url === `/api/reserva/${params}`) {
                // Borrar una reserva
                bajaReserva(req,res,params);
            } 
            else{
                responseError(res, "path incorrecto")
            }
            break;
    
        default:
            responseError(res, "petición incorrecta")
            break;
    }
    

})

server.listen(PORT);
console.log(`Api Gateway en el puerto ${PORT}`);