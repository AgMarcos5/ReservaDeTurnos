const http = require("http");    
const { config } = require("./config");

const { getTurnos, getReservaByID, bajaReserva, solicitarReserva, confirmarReserva } = require("./controllers/reservas");
const { getSucursales, getSucursal } = require("./controllers/sucursales");
const { responseError } = require("./lib/error");

const PORT = config.PORT ;

const server = http.createServer( async (req,res) => {

    const {url, method} = req;
    
    const idQuery = url.split("/api/")[1];
    const service = idQuery?.split(/[/?]/)[0];  // reserva o sucursales
    const param1 = idQuery?.split(/[/?]/)[1];   // ID        || query params || 'confirmar' o 'solicitar'
    const param2 = idQuery?.split(/[/?]/)[2];   // undefined ||  undefined   ||  ID

    console.log(`URL: ${url} - Method: ${method}`)

    switch (method) {
        case "GET":
            if(
                (url === '/api/reservas') || 
                (url === `/api/reservas?${param1}`)
            ) {
                // Get Reservas
                getTurnos(req,res, param1);
            } 
            else if(url === `/api/reservas/${param1}`) {
                // Reservas de un usuario por ID
                getReservaByID(req,res,param1);
            }
            else if(url === "/api/sucursales") {
                // Todas las sucursales
                getSucursales(req,res)
            }
            else if(url === `/api/sucursales/${param1}`) {
                // Sucursal por ID
                getSucursal(req,res,param1)
            }
            else{
                responseError(res, "path incorrecto")
            }
            break;
        case "POST":
            if(url === `/api/reservas/${param1}/${param2}`) {
                if (param1 === "solicitar") {
                    solicitarReserva(req,res,param2)
                } else 
                if (param1 === "confirmar") {
                    confirmarReserva(req,res,param2)
                }
            } 
            else{
                responseError(res, "path incorrecto")
            }
            break;
        case "DELETE":
            if(url === `/api/reservas/${param1}`) {
                // Borrar una reserva
                bajaReserva(req,res,param1);
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