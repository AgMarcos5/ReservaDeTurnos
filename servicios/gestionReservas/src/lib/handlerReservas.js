const fs = require('fs');
const path = require('path');
const { bodyParser } = require("./bodyParser");
const { sendMail } = require('./sendMail');
const { responseError } = require('./error');
const { config } = require('../config');

const {PATH_JSON,NOTIFICACIONES_PORT} = config;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const _verify_ = (req,turnoRequired) => {

    if (turnoRequired.status == 0) {
        turnoRequired.status = 1;
        turnoRequired.userId = req.body.userId;
    
        let timeout = setTimeout(() => {
            let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
            const turnos = JSON.parse(turnosJSON);
            
            const turno = turnos.find(element => element.idReserva === turnoRequired.idReserva);
            
            if (turno.status != 2) {
                turno.status = 0;
                turno.userId = -1;

                turnos.find(element => element.idReserva == turno.idReserva ? element = turno : false);
                fs.writeFileSync(path.join(__dirname + PATH_JSON), JSON.stringify(turnos));
            }
        },/*120000*/60000);
    }
    else
        throw new Error();
}

const _confirm_ = (req,turno) => {

    if (turno.status == 1 && turno.userId == req.body.userId){
        turno.status = 2;
        turno.email = req.body.email;

        let dateTime = turno.dateTime.split('T');
        let date = dateTime[0].split("-");

        date = `${date[2]}/${date[1]}/${date[0]}`;
        let time = dateTime[1].split(":");
        let hour = `${time[0]}:${time[1]}`;

        const options = {
            hostname: 'localhost',
            port: NOTIFICACIONES_PORT,
            path: '/api/notificacion',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }

        let mail = {
            'destinatario': turno.email,
            'asunto': 'Confirmación de reserva',
            'cuerpo': 
            `<p>Hola, le confirmamos que usted tiene una reserva a través de <b>Booking SSDD</b>.</p>
            <ul>
                <li>Día: <b>${date}</b></li>
                <li>Hora: <b>${hour}hs.</b></li>
                <li>Sucursal: <b>${turno.branchId}</b></li>
            </ul>
            <p><b>Booking SSDD</b>.</p>`,
        };

        sendMail(options,mail)
            .catch((error) => {
                console.log(error)
            })
    }
    else
        throw new Error();

}

const _delete_ = (req,turno) => {

    if(req.body.userId != 0 && turno.status != 0 && turno.userId === req.body.userId){
        turno.userId = -1;
        turno.email = null;
        turno.status = 0;
    }
    else
        throw new Error();
}


const reservasHandler = async (req,res,action,ID,method) => {
    
    try {
        let turnosJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const turnos = JSON.parse(turnosJSON);
        
        const turno = turnos.find(element => element.idReserva == ID);
        let msg = ''

        if(turno){
            try {
                await bodyParser(req);
                switch(method) {
                    case 'POST':
                        
                        if(action == 'solicitar'){
                            _verify_(req,turno);
                            msg = 'Reserva solicitada'
                        }
                        else 
                        if(action == 'confirmar'){
                            _confirm_(req,turno);
                            msg = 'Reserva confirmada'
                        }

                        break;
                    case 'DELETE':
                            _delete_(req,turno);
                        break;
                }
                turnos.find(element => element.idReserva == ID ? element = turno : false);
                fs.writeFileSync(path.join(__dirname + PATH_JSON), JSON.stringify(turnos));
                res.writeHead(200, { ...headers, "Content-Type": "application/json" });
                res.write(JSON.stringify({msg}));
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

module.exports = {
    reservasHandler,
}