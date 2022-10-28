
const reservasService = require('../services/reservasService');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const getReservas = async (req,res) => {
    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    const reservas = await reservasService.getReservas();
    console.log("controller", reservas)
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