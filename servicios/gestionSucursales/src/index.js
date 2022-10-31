const http = require("http");
const { getSucursales, getSucursal } = require("./lib/getData");


const error = (req, res) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.write(JSON.stringify({
        messageError: "error"
    }))
    res.end();
}


const server = http.createServer((req, res) => {
    
    const {url, method} = req;
    
    const idQuery = url.split("/api/sucursales")[1];
    const params = idQuery?.split(/[/?]/)[1];  // ID || query params

    
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
                error(req, res)
            }
            break;
    }
})

server.listen(6000);
console.log("Gestion Sucursales en el puerto 6000");