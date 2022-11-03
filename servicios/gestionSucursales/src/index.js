const http = require("http");
const { config } = require("./config");
const { responseError } = require("./lib/error");
const { getSucursales, getSucursal } = require("./lib/getData");
const { initMaps } = require("./lib/maps");

const {SUCURSALES_PORT} = config;

const server = http.createServer((req, res) => {
    
    const {url, method} = req;
    
    const idQuery = url.split("/api/sucursales")[1];
    const params = idQuery?.split(/[/?]/)[1];  // ID 

    
    console.log(`URL: ${url} - Method: ${method}`)

    switch (method) {
        case "GET":
            if(url === "/api/sucursales") {
                // Todas las sucursales
                getSucursales(req, res)
            }
            else if(url === `/api/sucursales/${params}`) {
                // Sucursal por ID
                getSucursal(req, res, params)
            }
            else {
                responseError(res, "Ruta inválida")
            }
            break;
        default :
            responseError(res,"Petición inválida")
    }
})

server.listen(SUCURSALES_PORT);
console.log(`Gestion Sucursales en el puerto ${SUCURSALES_PORT}`);

// MAPAS
initMaps();