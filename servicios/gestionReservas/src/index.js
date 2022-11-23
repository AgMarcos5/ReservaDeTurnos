const http = require("http");
const _url_ = require('url')
const { config } = require("./config")
const { responseError } = require("./lib/error");
const { getReserva, getTurnos } = require('./lib/getData')
const { reservasHandler } = require('./lib/handlerReservas')

const {RESERVAS_PORT} = config;


const server = http.createServer((req,res) => {

    const {url, method} = req;
    
    const idQuery = url.split("/api/reservas")[1];
    const param1 = idQuery?.split(/[/?]/)[1];   // ID        || query params || 'confirmar' o 'solicitar'
    const param2 = idQuery?.split(/[/?]/)[2];   // undefined ||  undefined   ||  ID

    console.log(`URL: ${url} - Method: ${method}`)
    
    switch(method) {
        case "GET":
            if((url === '/api/reservas') || (url === `/api/reservas?${param1}`)) {
                // Filtro por queryParams
                const queryObject = _url_.parse(url,true).query;
                const empty_qp = {userId:'', branchId:'', dateTime:''}
                const queryParams = Object.assign({},empty_qp,queryObject)
                getTurnos(req,res,queryParams);
            }   
            else if(url === `/api/reservas/${param1}`) {
                // GET una reserva
                getReserva(req,res,param1);
            }
            else{
                responseError(res, "Ruta inválida")
            }
            break;
        case "POST":
            if((url === `/api/reservas/solicitar/${param2}`) || 
                (url === `/api/reservas/confirmar/${param2}`)) {
                // Solicitar una reserva | Confirmar una reserva
                reservasHandler(req,res,param1,param2,'POST');
            }
            else {
                responseError(res, "Ruta inválida")
            }
            break;
        case "DELETE":
            if(url === `/api/reservas/${param1}`) {
                // Borrar una reserva
                reservasHandler(req,res,param2,param1,'DELETE');
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