const fs = require('fs');
const path = require('path');


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};


function getSucursales(req, res) {
    let sucursalesJson = fs.readFileSync(path.join(__dirname + '/../../sucursales.json'));
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    res.write(sucursalesJson);
    res.end();    
}


function getSucursal(req, res, ID) {
    let sucursalesJson = fs.readFileSync(path.join(__dirname + '/../../sucursales.json'));
    const sucursales = JSON.parse(sucursalesJson);

    const sucursal = sucursales.find( (element)=> {
        if(element.id == ID) {
            return element;
        }
        else {
            return false;
        }
    });

    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    if(sucursal) {
        res.write(JSON.stringify(sucursal));
    }
    else {
        res.write(JSON.stringify({
            messageError: "error"
        }))
    }
    res.end();
}


module.exports = {
    getSucursales,
    getSucursal,
}