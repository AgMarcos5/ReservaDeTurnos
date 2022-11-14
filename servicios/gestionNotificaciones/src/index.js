const http = require('http')
const { config } = require("./config")
const { responseError } = require("./lib/error");
const { sendMail } = require('./lib/getData')

const {NOTIFICACIONES_PORT} = config;


const server = http.createServer((req,res) => {

    const {url, method} = req;
    
    console.log(`URL: ${url} - Method: ${method}`)

    switch(method) {
        case "POST":
            if(url === `/api/notificaciones`) {
                // Enviar un mail
                sendMail(req,res);
            }
            else {
                responseError(res, "Ruta inválida")
            }
            break;
        default:
            responseError(res,"Petición inválida")
    }

})

server.listen(NOTIFICACIONES_PORT);
console.log(`Gestión Notificaciones en el puerto ${NOTIFICACIONES_PORT}`);