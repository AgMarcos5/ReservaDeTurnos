
const reservasService = require('../services/reservasService');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const getReservas = (req,res) => {
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    const reservas = reservasService.getReservas();
    res.write(JSON.stringify(reservas));
    res.end();
}

const getReservasUsuario = (req,res) => {
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    const reservas = reservasService.getReservasUsuario();
    res.write(JSON.stringify(reservas));
    res.end();
}

const altaReserva = (req,res) => {

}

const bajaReserva = (req,res) => {

}


module.exports = {
    getReservas,
    getReservasUsuario,
    altaReserva,
    bajaReserva,
}