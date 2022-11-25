
const { config } = require('../config');
const { responseError } = require('../lib/error');
const { getData } = require('../lib/getData');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, DELETE',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const options = {
    hostname: 'localhost',
    port: config.SUCURSALES_PORT,
}


const getSucursal = async (req,res,ID) => {
    try {
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/sucursales/${ID}`, 
            method: "GET"
        });
        
        const statusCode = data.res.statusCode;
        res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data.body));
        res.end();
    } catch (error) {
        responseError(res,error)
    }

}

const getSucursales = async (req,res) => {
    try {
        const data = await getData({
            ...req,
            ...options, 
            path: '/api/sucursales', 
            method: "GET"
        });
        
        const statusCode = data.res.statusCode;
        res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data.body));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}




module.exports = {
    getSucursal,
    getSucursales,
}