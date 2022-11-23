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


const getReserva = (req,res,ID) => {

    try{
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
        
        const turno = turnos.find(element => element.idReserva == ID);

        if(turno){
            res.writeHead(200, { ...headers, "Content-Type": "application/json" });
            res.write(JSON.stringify(turno));
            res.end();
        }
        else{
            responseError(res,"No existe reserva")
        }
    } catch (error) {
        responseError(res,"No se encuentra el archivo de reservas")
    }
}



const filterByQP = (array,param,value) => {
    if( value != ''){
        if(param === 'dateTime') {  // Caso dateTime
            const valueDate = new Date(value).toISOString().split('T')[0];
            return array.filter( turno => {
                const turnoDate = new Date(turno[param]).toISOString().split('T')[0];
                return valueDate === turnoDate;
            })
        }
        else{ // Caso userId o branchId
            return array.filter( turno => turno[param] == value);
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
    getReserva,
    getTurnos,
}