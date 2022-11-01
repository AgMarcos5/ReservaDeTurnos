const fs = require('fs');
const path = require('path');
const { config } = require('../config');
const { responseError } = require('./error');

const {PATH_JSON} = config;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};


function getSucursales(req, res) {
    try {
        let sucursalesJson = fs.readFileSync(path.join(__dirname + PATH_JSON));
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(sucursalesJson);
        res.end();  
    } catch (error) {
        responseError(res,"No se encuentra el archivo de sucursales")
    }
      
}

function getSucursal(req, res, ID) {
    try {
        let sucursalesJson = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const sucursales = JSON.parse(sucursalesJson);

        const sucursal = sucursales.find( element => element.id === ID)

        if(sucursal){
            res.writeHead(200, { ...headers, "Content-Type": "application/json" });
            res.write(JSON.stringify(sucursal));
            res.end();
        }
        else{
            responseError(res,"No se encuentra la sucursal")
        }
    } catch (error) {
        responseError(res,"No se encuentra el archivo de sucursales")
    }
}


module.exports = {
    getSucursales,
    getSucursal,
}