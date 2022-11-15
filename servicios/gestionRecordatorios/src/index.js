const http = require('http');
const fs = require('fs');
const path = require('path');
const { config } = require("./config");
const { POSTRequest } = require('./lib/notificaciones');

const { PATH_JSON, INTERVAL } = config;


const requestOptions = {
    hostname: 'localhost',
    port: config.NOTIFICACIONES_PORT,
    path: '/api/notificaciones',
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    }
}

const notify = async (element) => {
    try{
        let dateTime = element['dateTime'].split("T");
        
        let date = dateTime[0].split("-");
        let fecha = `${date[2]}/${date[1]}/${date[0]}`;
        
        let time = dateTime[1].split(":");
        let hora = `${time[0]}:${time[1]}`;
        
        let body = {
            'destinatario': element['email'],
            'asunto': 'Recordatorio de reserva',
            'cuerpo': `Hola, le recordamos que tiene una reserva el ${fecha} a las ${hora}hs, en la sucursal ${element['branchId']}.`,
        };
        
        await POSTRequest(requestOptions, body);

    } catch (error) {
        console.log(error)
    }

}

const notifyReservas = () => {
    try{
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
        
        const reservas = turnos.filter(chain => chain.userId != -1);
        const dateActual = new Date().toISOString().split("T")[0];
        reservas.forEach(element => {
            const dateTurno = element['dateTime'].split("T")[0];
            if(dateActual === dateTurno){
                notify(element);
            }
        });
        
    } catch (error) {
        console.log("No se encuentra el archivo de reservas")
    }
}

console.log('Gestion de Recordatorios');
let recordatorio = setInterval(notifyReservas, INTERVAL);
