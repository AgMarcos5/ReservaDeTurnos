const fs = require('fs');
const path = require('path');
const { bodyParser } = require("./bodyParser");
const { config } = require('../config');
const { responseError } = require('./error');

const {PATH_JSON} = config;


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};


const getReservasUsuario = (req,res,ID) => {

    try{
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
        
        const user_turnos = turnos.filter(chain => chain.userId === ID);

        if(user_turnos.length){
            res.writeHead(200, { ...headers, "Content-Type": "application/json" });
            res.write(JSON.stringify(user_turnos));
            res.end();
        }
        else{
            responseError(res,"No existe usuario")
        }
    } catch (error) {
        responseError(res,"No se encuentra el archivo de reservas")
    }
}


const reservasHandler = async (req,res,ID,method) => {
    
    try {
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
        
        const turno = turnos.find(element => element.id === ID);

        if(turno){
            try {
                switch(method) {
                    case 'POST':
                        await bodyParser(req)
                        turno.userId = req.body.userId;
                        turno.email = req.body.email;
                        break;
                    case 'DELETE':
                        turno.userId = -1;
                        turno.email = -1;
                        break;
                }
                turnos.find(element => element.id === ID ? element = turno : false);
                fs.writeFileSync(path.join(__dirname + PATH_JSON), JSON.stringify(turnos));
                res.writeHead(200, { ...headers, "Content-Type": "application/json" });
                res.write(JSON.stringify(turnos));
                res.end();
            } catch (error) {
                responseError(res,"No se pudo realizar la operación")
            }
        }
        else
            responseError(res,"No se encontraron turnos")

    } catch (error) {
        responseError(res,"No se encuentra el archivo de reservas")
    }
}


const filterByQP = (array,param,value) => {
    if( value != ''){
        if(param === 'datetime') {  // Caso datetime
            const valueDate = new Date(value).toISOString().split('T')[0];
            return array.filter( turno => {
                const turnoDate = new Date(turno[param]).toISOString().split('T')[0];
                return valueDate === turnoDate;
            })
        }
        else{ // Caso userId o branchId
            return array.filter( turno => turno[param] === value)
        }
    }
    return array;
} 

const getTurnos = (req,res,queryParams) => {
    try{
        const turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);

        let turnosFiltrados = turnos;

        // Recorro todos los query params y los filtro
        for (const param in queryParams) {
            const value = queryParams[param];
            turnosFiltrados = filterByQP(turnosFiltrados,param,value)
        }

        if(turnosFiltrados.length){
            res.writeHead(200, { ...headers, "Content-Type": "application/json" });
            res.write(JSON.stringify(turnosFiltrados));
            res.end();
        }
        else 
            responseError(res,"No hay turnos")
    } catch (error) {
        responseError(res,"No se encuentra el archivo de reservas")
    }
}



module.exports = {
    getReservasUsuario,
    reservasHandler,
    getTurnos,
}