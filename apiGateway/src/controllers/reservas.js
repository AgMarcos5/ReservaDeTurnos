
const { config } = require('../config');
const { bodyParser } = require('../lib/bodyParser');
const { responseError } = require('../lib/error');
const { getData } = require('../lib/getData');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Request-Method': '*',
    'Access-Control-Request-Headers': '*',
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
            path: `/api/reservas${qp}`, 
            method: "GET"
        });

        console.log(`/api/reservas${qp}`)
        
        const statusCode = data.res.statusCode;
        res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data.body));
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
            path: `/api/reservas/${ID}`, 
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



const solicitarReserva = async (req,res,ID) => {
    try {
        await bodyParser(req)
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reservas/solicitar/${ID}`, 
            method: "POST", 
        });
        
        const statusCode = data.res.statusCode;
        res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data.body));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}

const confirmarReserva = async (req,res,ID) => {
    try {
        await bodyParser(req)
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reservas/confirmar/${ID}`, 
            method: "POST", 
        });
        
        const statusCode = data.res.statusCode;
        res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data.body));
        res.end();
    } catch (error) {
        responseError(res,error)
    }
}

const bajaReserva = async (req,res,ID) => {
    try {
        await bodyParser(req)
        const data = await getData({
            ...req,
            ...options, 
            path: `/api/reservas/${ID}`, 
            method: "DELETE"
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
    getTurnos,
    getReservaByID,
    solicitarReserva,
    confirmarReserva,
    bajaReserva,
}