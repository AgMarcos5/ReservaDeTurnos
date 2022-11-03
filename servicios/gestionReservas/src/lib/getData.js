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


const getTurnos = (req,res,queryParams) => {
    type = ['usuario','sucursal','turno'];
    error = 0;
    
    try{
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
    
        let filter_userTurnos = [];
        let filter_branchId = [];
        let filter_dateTime = [];

        // filtro por userId
        if(queryParams.userId != ''){
            filter_userTurnos = turnos.filter(chain => chain.userId === queryParams.userId);
            if(!filter_userTurnos.length)
                error = 1;
        }
        else
            filter_userTurnos = turnos.filter(chain => chain.userId == -1);

        // filtro por sucursal
        if (!error && queryParams.branchId != ''){
            filter_branchId = filter_userTurnos.filter(chain => chain.branchId === queryParams.branchId);
            if(!filter_branchId.length)
                error = 2;
        }
        else
            filter_branchId = filter_userTurnos;

        // filtro por fecha    
        if (!error && queryParams.datetime != ''){
            let queryDate = queryParams.datetime.split('T')[0];
            filter_dateTime = filter_branchId.filter(chain => chain.datetime.split('T')[0] === queryDate);
            if(!filter_dateTime.length)
                error = 3;
        }
        else
            filter_dateTime = filter_branchId;
        
        
        if(!error){
            res.writeHead(200, { ...headers, "Content-Type": "application/json" });
            res.write(JSON.stringify(filter_dateTime));
            res.end();
        }
        else // No existe usuario | sucursal | fecha
            responseError(res,`No existe ${type[error-1]}`)

    } catch (error) {
        responseError(res,"No se encuentra el archivo de reservas")
    }
}


module.exports = {
    getReservasUsuario,
    reservasHandler,
    getTurnos,
}