
const { config } = require('../config');
const { bodyParser } = require('../lib/bodyParser');
const { responseError } = require('../lib/error');
const { getData } = require('../lib/getData');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const options = {
    hostname: 'localhost',
    port: config.RESERVAS_PORT,
}

const getTurnos = async (req,res, queryParams=null) => {
    try {
        const qp = queryParams ? `?${queryParams}` : '';

        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reserva${qp}`, 
            method: "GET"
        });

        console.log(`/api/reserva${qp}`)
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}

const getReservaByID = async (req,res,ID) => {
    try {
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reserva/${ID}`, 
            method: "GET"
        });
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}


const altaReserva = async (req,res,ID) => {
    try {
        await bodyParser(req)
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reserva/${ID}`, 
            method: "POST", 
        });
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}

const bajaReserva = async (req,res,ID) => {
    try {
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reserva/${ID}`, 
            method: "DELETE"
        });
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
    
}


module.exports = {
    getTurnos,
    getReservaByID,
    altaReserva,
    bajaReserva,
}