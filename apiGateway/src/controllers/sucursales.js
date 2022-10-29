
const { getData } = require('../lib/getData');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const options = {
    hostname: 'localhost',
    port: 6000,
}


const getSucursal = async (req,res,ID) => {
    
    const data = await getData({
        ...req,
        ...options, 
        path: `/api/sucursales/${ID}`, 
        method: "GET"
    });
    
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data));
    res.end();
}

const getSucursales = async (req,res) => {
    
    const data = await getData({
        ...req,
        ...options, 
        path: '/api/sucursales', 
        method: "GET"
    });
    
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data));
    res.end();
}




module.exports = {
    getSucursal,
    getSucursales,
}