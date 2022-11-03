const http = require("http");
const _url_ = require('url')
const { config } = require("./config")
const { responseError } = require("./lib/error");
const { getReservasUsuario, reservasHandler, getTurnos } = require('./lib/getData')


const {RESERVAS_PORT} = config;


const server = http.createServer((req,res) => {

    const {url, method} = req;
    
    const idQuery = url.split("/api/reservas")[1];
    const params = idQuery?.split(/[/?]/)[1];  // ID || query params

    
    console.log(`URL: ${url} - Method: ${method}`)

    switch(method) {
        case "GET":
            if((url === '/api/reservas') || (url === `/api/reservas?${params}`)) {
                // Filtro por queryParams
                const queryObject = _url_.parse(url,true).query;
                const empty_qp = {userId:'', branchId:'', datetime:''}
                const queryParams = Object.assign({},empty_qp,queryObject)
                getTurnos(req,res,queryParams);
            }   
            else if(url === `/api/reservas/${params}`) {
                // Reservas de un usuario
                getReservasUsuario(req,res,params);
            }
            else{
                responseError(res, "Ruta inválida")
            }
            break;
        case "POST":
            if(url === `/api/reservas/${params}`) {
                // Agregar una reserva
                reservasHandler(req,res,params,'POST');
            }
            else {
                responseError(res, "Ruta inválida")
            }
            break;
        case "DELETE":
            if(url === `/api/reservas/${params}`) {
                // Borrar una reserva
                reservasHandler(req,res,params,'DELETE');
            }
            else {
                responseError(res, "Ruta inválida")
            }
            break;
        default:
            responseError(res,"Petición inválida")
    }

})

server.listen(RESERVAS_PORT);
console.log(`Gestión Reservas en el puerto ${RESERVAS_PORT}`);